#!/bin/bash

# Clean deployment script - ensures proper build and deployment without timeout issues
# This properly handles the separation of code and large image assets

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo ""
    echo -e "${BLUE}===================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}===================================${NC}"
}

print_status() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

# Load configuration
source "$(dirname "$0")/config.sh"

# Parse arguments
SKIP_BUILD=false
SKIP_IMAGES=false
IMAGES_ONLY=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --skip-images)
            SKIP_IMAGES=true
            shift
            ;;
        --images-only)
            IMAGES_ONLY=true
            shift
            ;;
        *)
            echo "Usage: $0 [--skip-build] [--skip-images] [--images-only]"
            echo ""
            echo "Options:"
            echo "  --skip-build   Skip the Next.js build step"
            echo "  --skip-images  Deploy code only, skip image upload"
            echo "  --images-only  Upload images only, skip code deployment"
            exit 1
            ;;
    esac
done

# Step 1: Build Next.js app (if not skipping)
if [ "$IMAGES_ONLY" = false ] && [ "$SKIP_BUILD" = false ]; then
    print_header "🔨 Building Next.js Application"
    
    # Clean previous build
    rm -rf out .next
    
    # Build the app
    npm run build
    
    # Remove images from build output to prevent CDK timeout
    if [ -d "out/images/rae" ]; then
        print_warning "Removing Rae images from build output (managed separately)"
        rm -rf out/images/rae/*.webp
        # Keep the directory structure and README if it exists
        mkdir -p out/images/rae
        [ -f "public/images/rae/README.md" ] && cp public/images/rae/README.md out/images/rae/
    fi
    
    print_status "Build complete (images excluded)"
fi

# Step 2: Deploy code via CDK (if not images only)
if [ "$IMAGES_ONLY" = false ]; then
    print_header "📦 Deploying Application Code via CDK"
    
    # Build CDK
    cd cdk
    rm -rf lib/*.d.ts lib/*.js
    npm run build
    cd ..
    
    # Deploy via CDK (without images)
    cd cdk
    npx cdk deploy "$APP_STACK" --require-approval never
    cd ..
    
    if [ $? -eq 0 ]; then
        print_status "Code deployment successful!"
    else
        print_error "Code deployment failed!"
        exit 1
    fi
fi

# Step 3: Handle images separately (if not skipping)
if [ "$SKIP_IMAGES" = false ]; then
    print_header "📸 Syncing Rae's Images to S3"
    
    # Check if images exist locally
    IMAGE_COUNT=$(ls -1 public/images/rae/*.webp 2>/dev/null | wc -l || echo 0)
    
    if [ "$IMAGE_COUNT" -gt 0 ]; then
        echo "Found $IMAGE_COUNT images to sync"
        
        # Upload directly to S3
        aws s3 sync public/images/rae/ s3://jimmypocock.com-app/images/rae/ \
            --profile "$AWS_PROFILE" \
            --exclude "*.md" \
            --exclude ".*" \
            --delete
        
        print_status "Images uploaded to S3"
        
        # Invalidate CloudFront cache for images
        print_warning "Invalidating CloudFront cache for images..."
        DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
            --stack-name "$CDN_STACK" \
            --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" \
            --output text \
            --profile "$AWS_PROFILE")
        
        if [ -n "$DISTRIBUTION_ID" ]; then
            aws cloudfront create-invalidation \
                --distribution-id "$DISTRIBUTION_ID" \
                --paths "/images/rae/*" \
                --profile "$AWS_PROFILE" > /dev/null
            
            print_status "Cache invalidation started"
        fi
    else
        print_warning "No images found locally - they're managed in S3"
    fi
fi

print_header "🎉 Deployment Complete!"

# Get the site URL
DISTRIBUTION_URL=$(aws cloudformation describe-stacks \
    --stack-name "$CDN_STACK" \
    --query "Stacks[0].Outputs[?OutputKey=='DistributionUrl'].OutputValue" \
    --output text \
    --profile "$AWS_PROFILE")

if [ -n "$DISTRIBUTION_URL" ]; then
    echo ""
    echo -e "${GREEN}Your site is live at:${NC} $DISTRIBUTION_URL"
fi

echo ""
echo "Quick commands:"
echo "  Deploy code only:    $0 --skip-images"
echo "  Deploy images only:  $0 --images-only"
echo "  Full deployment:     $0"