#!/bin/bash

# Script to check DNS setup for the website

echo "🔍 Checking DNS Setup for jimmypocock.com..."
echo ""

# Check CloudFront distribution
echo "1️⃣ Getting CloudFront Distribution Domain..."
DIST_DOMAIN=$(aws cloudformation describe-stacks \
    --stack-name JIMMYPOCOCKCOM-CDN \
    --region us-east-1 \
    --query 'Stacks[0].Outputs[?OutputKey==`DistributionDomainName`].OutputValue' \
    --output text 2>/dev/null)

if [ -n "$DIST_DOMAIN" ]; then
    echo "✅ CloudFront Domain: $DIST_DOMAIN"
else
    echo "❌ Could not find CloudFront distribution"
    exit 1
fi

echo ""
echo "2️⃣ Current DNS Records:"
echo "Checking jimmypocock.com..."
nslookup jimmypocock.com
echo ""
echo "Checking www.jimmypocock.com..."
nslookup www.jimmypocock.com

echo ""
echo "3️⃣ Required DNS Setup in Namecheap:"
echo ""
echo "You need to create these records:"
echo ""
echo "For the root domain (jimmypocock.com):"
echo "  Type: ALIAS or ANAME (if available) or CNAME with @ as host"
echo "  Host: @"
echo "  Value: $DIST_DOMAIN"
echo ""
echo "For www subdomain:"
echo "  Type: CNAME"
echo "  Host: www"
echo "  Value: $DIST_DOMAIN"
echo ""
echo "Note: Some DNS providers don't support ALIAS for root domains."
echo "If Namecheap doesn't support ALIAS records, you may need to:"
echo "1. Use their URL redirect for the root domain"
echo "2. Or use only www.jimmypocock.com as your primary domain"

echo ""
echo "4️⃣ Testing CloudFront directly:"
echo "You can test if CloudFront is working by visiting:"
echo "https://$DIST_DOMAIN"