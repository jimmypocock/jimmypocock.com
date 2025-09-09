#!/bin/bash

# Comprehensive diagnostic script for CloudFront + S3 issues

echo "🔍 CloudFront + S3 Diagnostic Report"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Get stack outputs
echo "1️⃣ Getting Stack Outputs..."
echo "----------------------------"

# Get S3 bucket name
BUCKET_NAME=$(aws cloudformation describe-stacks \
    --stack-name JIMMYPOCOCKCOM-Foundation \
    --query 'Stacks[0].Outputs[?OutputKey==`WebsiteBucketName`].OutputValue' \
    --output text \
    --region us-east-1 2>/dev/null)

if [ -n "$BUCKET_NAME" ]; then
    echo -e "${GREEN}✓ S3 Bucket: $BUCKET_NAME${NC}"
else
    echo -e "${RED}✗ Could not find S3 bucket${NC}"
    exit 1
fi

# Get distribution ID
DIST_ID=$(aws cloudformation describe-stacks \
    --stack-name JIMMYPOCOCKCOM-CDN \
    --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' \
    --output text \
    --region us-east-1 2>/dev/null)

if [ -n "$DIST_ID" ]; then
    echo -e "${GREEN}✓ Distribution ID: $DIST_ID${NC}"
else
    echo -e "${RED}✗ Could not find CloudFront distribution${NC}"
    exit 1
fi

echo ""
echo "2️⃣ Checking S3 Bucket Contents..."
echo "----------------------------"

FILE_COUNT=$(aws s3 ls s3://$BUCKET_NAME/ --recursive | wc -l | tr -d ' ')
echo "Files in bucket: $FILE_COUNT"

if [ "$FILE_COUNT" -eq "0" ]; then
    echo -e "${RED}✗ S3 bucket is empty!${NC}"
else
    echo "First 10 files:"
    aws s3 ls s3://$BUCKET_NAME/ --recursive | head -10
fi

echo ""
echo "3️⃣ Checking S3 Bucket Policy..."
echo "----------------------------"

BUCKET_POLICY=$(aws s3api get-bucket-policy --bucket $BUCKET_NAME --output text 2>/dev/null)
if [ -n "$BUCKET_POLICY" ]; then
    echo "Bucket Policy:"
    echo "$BUCKET_POLICY" | jq '.' 2>/dev/null || echo "$BUCKET_POLICY"
else
    echo -e "${YELLOW}⚠ No bucket policy found${NC}"
fi

echo ""
echo "4️⃣ Checking CloudFront Distribution..."
echo "----------------------------"

# Get distribution config
DIST_CONFIG=$(aws cloudfront get-distribution --id $DIST_ID 2>/dev/null)

if [ -n "$DIST_CONFIG" ]; then
    # Extract key information
    echo "Distribution Status: $(echo "$DIST_CONFIG" | jq -r '.Distribution.Status')"
    echo "Domain Name: $(echo "$DIST_CONFIG" | jq -r '.Distribution.DomainName')"
    
    # Check origin configuration
    echo ""
    echo "Origin Configuration:"
    echo "$DIST_CONFIG" | jq '.Distribution.DistributionConfig.Origins.Items[0] | {DomainName, OriginPath, S3OriginConfig, OriginAccessControlId}'
    
    # Check if using OAI or OAC
    OAI=$(echo "$DIST_CONFIG" | jq -r '.Distribution.DistributionConfig.Origins.Items[0].S3OriginConfig.OriginAccessIdentity // empty')
    OAC_ID=$(echo "$DIST_CONFIG" | jq -r '.Distribution.DistributionConfig.Origins.Items[0].OriginAccessControlId // empty')
    
    if [ -n "$OAI" ]; then
        echo -e "${YELLOW}⚠ Using Origin Access Identity (OAI) - Legacy method${NC}"
    elif [ -n "$OAC_ID" ]; then
        echo -e "${GREEN}✓ Using Origin Access Control (OAC) - Modern method${NC}"
        echo "OAC ID: $OAC_ID"
    else
        echo -e "${RED}✗ No origin access configuration found!${NC}"
    fi
    
    # Check default root object
    echo ""
    echo "Default Root Object: $(echo "$DIST_CONFIG" | jq -r '.Distribution.DistributionConfig.DefaultRootObject')"
    
    # Check error pages
    echo ""
    echo "Custom Error Pages:"
    echo "$DIST_CONFIG" | jq '.Distribution.DistributionConfig.CustomErrorResponses'
else
    echo -e "${RED}✗ Could not get distribution configuration${NC}"
fi

echo ""
echo "5️⃣ Testing Direct S3 Access..."
echo "----------------------------"

# Try to access index.html directly
INDEX_EXISTS=$(aws s3 ls s3://$BUCKET_NAME/index.html 2>/dev/null)
if [ -n "$INDEX_EXISTS" ]; then
    echo -e "${GREEN}✓ index.html exists in S3${NC}"
    echo "File details: $INDEX_EXISTS"
else
    echo -e "${RED}✗ index.html not found in S3${NC}"
fi

echo ""
echo "6️⃣ CloudFront Origin Access Control..."
echo "----------------------------"

if [ -n "$OAC_ID" ]; then
    OAC_CONFIG=$(aws cloudfront get-origin-access-control --id $OAC_ID 2>/dev/null)
    if [ -n "$OAC_CONFIG" ]; then
        echo "OAC Configuration:"
        echo "$OAC_CONFIG" | jq '.OriginAccessControl'
    fi
fi

echo ""
echo "7️⃣ Required S3 Bucket Policy for OAC..."
echo "----------------------------"

if [ -n "$OAC_ID" ]; then
    echo "Your bucket should have a policy like this:"
    cat << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipal",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::$(aws sts get-caller-identity --query Account --output text):distribution/$DIST_ID"
                }
            }
        }
    ]
}
EOF
fi

echo ""
echo "8️⃣ Recommendations..."
echo "----------------------------"

if [ "$FILE_COUNT" -eq "0" ]; then
    echo -e "${RED}1. Your S3 bucket is empty. Deploy your app content first:${NC}"
    echo "   npm run build"
    echo "   npm run deploy:app"
fi

if [ -z "$BUCKET_POLICY" ] && [ -n "$OAC_ID" ]; then
    echo -e "${RED}2. Add the required bucket policy for CloudFront OAC access${NC}"
fi

echo ""
echo "📝 Summary"
echo "----------------------------"
echo "S3 Bucket: $BUCKET_NAME"
echo "CloudFront Distribution: https://$(echo "$DIST_CONFIG" | jq -r '.Distribution.DomainName' 2>/dev/null || echo 'unknown')"
echo "Files in bucket: $FILE_COUNT"