#!/bin/bash

# Script to invalidate CloudFront cache

set -e

# Load configuration
source "$(dirname "$0")/config.sh"

echo "🔄 Invalidating CloudFront Cache..."
echo "==================================="

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
DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
    --stack-name "$CDN_STACK" \
    --region us-east-1 \
    --query 'Stacks[0].Outputs[?OutputKey==`DistributionId`].OutputValue' \
    --output text)

if [ -z "$DISTRIBUTION_ID" ]; then
    echo -e "${RED}❌ Could not find CloudFront distribution ID${NC}"
    exit 1
fi

echo "Distribution ID: $DISTRIBUTION_ID"

# Create invalidation
echo "Creating invalidation..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Invalidation created successfully!${NC}"
    echo "Invalidation ID: $INVALIDATION_ID"
    echo -e "${YELLOW}Note: Invalidation typically takes 5-10 minutes to complete${NC}"
else
    echo -e "${RED}❌ Failed to create invalidation${NC}"
    exit 1
fi