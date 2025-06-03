#!/bin/bash

# Script to fix S3 bucket policy for CloudFront Origin Access Control
# This grants CloudFront the necessary permissions to access the S3 bucket

set -e

# Load configuration
source "$(dirname "$0")/config.sh"

echo "🔧 Fixing S3 Bucket Policy for CloudFront OAC..."
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not configured. Please run 'aws configure' or set AWS_PROFILE${NC}"
    exit 1
fi

# Get the CloudFront distribution ID
echo "Getting CloudFront distribution information..."
DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
    --stack-name "$CDN_STACK" \
    --region us-east-1 \
    --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' \
    --output text)

if [ -z "$DISTRIBUTION_ID" ]; then
    echo -e "${RED}❌ Could not find CloudFront distribution ID${NC}"
    exit 1
fi

echo "Found distribution ID: $DISTRIBUTION_ID"

# Get the Origin Access Control ID from the distribution
echo "Getting Origin Access Control ID..."
OAC_ID=$(aws cloudfront get-distribution-config \
    --id "$DISTRIBUTION_ID" \
    --query 'DistributionConfig.Origins.Items[0].S3OriginConfig.OriginAccessIdentity' \
    --output text 2>/dev/null || echo "")

# If OAC_ID is empty or "None", we need to check for OAC
if [ -z "$OAC_ID" ] || [ "$OAC_ID" = "None" ]; then
    echo "Checking for Origin Access Control configuration..."
    OAC_ID=$(aws cloudfront get-distribution \
        --id "$DISTRIBUTION_ID" \
        --query 'Distribution.DistributionConfig.Origins.Items[0].OriginAccessControlId' \
        --output text)
fi

if [ -z "$OAC_ID" ] || [ "$OAC_ID" = "None" ]; then
    echo -e "${RED}❌ Could not find Origin Access Control ID${NC}"
    exit 1
fi

echo "Found OAC ID: $OAC_ID"

# Create the bucket policy
BUCKET_NAME="${DOMAIN_NAME}-app"
echo "Creating bucket policy for: $BUCKET_NAME"

# Create the policy document
cat > /tmp/bucket-policy.json <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCloudFrontServicePrincipalReadOnly",
            "Effect": "Allow",
            "Principal": {
                "Service": "cloudfront.amazonaws.com"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${BUCKET_NAME}/*",
            "Condition": {
                "StringEquals": {
                    "AWS:SourceArn": "arn:aws:cloudfront::$(aws sts get-caller-identity --query Account --output text):distribution/${DISTRIBUTION_ID}"
                }
            }
        }
    ]
}
EOF

# Apply the bucket policy
echo "Applying bucket policy..."
aws s3api put-bucket-policy \
    --bucket "$BUCKET_NAME" \
    --policy file:///tmp/bucket-policy.json

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Bucket policy applied successfully!${NC}"
    
    # Clean up
    rm -f /tmp/bucket-policy.json
    
    echo -e "\n${GREEN}🎉 S3 bucket is now properly configured for CloudFront OAC${NC}"
    echo -e "${YELLOW}Note: It may take a few minutes for changes to propagate${NC}"
else
    echo -e "${RED}❌ Failed to apply bucket policy${NC}"
    exit 1
fi