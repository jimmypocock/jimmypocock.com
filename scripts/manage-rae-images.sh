#!/bin/bash

# Script to manage Rae's images separately from main deployment
# This handles large image uploads directly to S3, bypassing CDK timeout issues

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BUCKET_NAME="jimmypocock.com-app"
IMAGE_PATH="public/images/rae"
S3_PATH="images/rae"
PROFILE="jimmycpocock"
DISTRIBUTION_ID="E1P43FQCTLJGL1"

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

# Function to upload images
upload_images() {
    echo "📸 Uploading Rae's images to S3..."
    echo "===================================="
    
    # Check if images directory exists
    if [ ! -d "$IMAGE_PATH" ]; then
        print_error "Image directory $IMAGE_PATH not found!"
        exit 1
    fi
    
    # Count images
    IMAGE_COUNT=$(ls -1 "$IMAGE_PATH"/*.webp 2>/dev/null | wc -l)
    if [ "$IMAGE_COUNT" -eq 0 ]; then
        print_warning "No .webp images found in $IMAGE_PATH"
        exit 0
    fi
    
    echo "Found $IMAGE_COUNT images to sync"
    
    # Sync images to S3 (only uploads changed files)
    aws s3 sync "$IMAGE_PATH" "s3://$BUCKET_NAME/$S3_PATH" \
        --profile "$PROFILE" \
        --delete \
        --exclude "*.md" \
        --exclude ".*" \
        --content-type "image/webp"
    
    print_status "Images uploaded successfully!"
}

# Function to invalidate CloudFront cache
invalidate_cache() {
    echo ""
    echo "🔄 Invalidating CloudFront cache..."
    echo "===================================="
    
    INVALIDATION_ID=$(aws cloudfront create-invalidation \
        --distribution-id "$DISTRIBUTION_ID" \
        --paths "/images/rae/*" \
        --profile "$PROFILE" \
        --query 'Invalidation.Id' \
        --output text)
    
    print_status "Cache invalidation started (ID: $INVALIDATION_ID)"
    echo "Note: Cache invalidation typically takes 5-10 minutes to complete"
}

# Function to list current images
list_images() {
    echo "📋 Current images in S3:"
    echo "========================"
    aws s3 ls "s3://$BUCKET_NAME/$S3_PATH/" --profile "$PROFILE" | grep -E '\.webp$' | wc -l
    echo "images found"
}

# Function to download images from S3 (backup)
download_images() {
    echo "💾 Downloading images from S3 to local..."
    echo "=========================================="
    aws s3 sync "s3://$BUCKET_NAME/$S3_PATH" "$IMAGE_PATH" \
        --profile "$PROFILE" \
        --exclude "*.md" \
        --exclude ".*"
    print_status "Images downloaded successfully!"
}

# Function to add new images
add_images() {
    echo "➕ Adding new images..."
    echo "========================"
    
    # Find the highest numbered rae-N.webp file
    LAST_NUM=$(ls -1 "$IMAGE_PATH"/rae-*.webp 2>/dev/null | \
               sed 's/.*rae-\([0-9]*\)\.webp/\1/' | \
               sort -n | tail -1)
    
    if [ -z "$LAST_NUM" ]; then
        LAST_NUM=0
    fi
    
    echo "Last image number: $LAST_NUM"
    
    # Rename any new images that don't follow the pattern
    COUNTER=$((LAST_NUM + 1))
    for file in "$IMAGE_PATH"/*.webp; do
        filename=$(basename "$file")
        if [[ ! "$filename" =~ ^rae-[0-9]+\.webp$ ]]; then
            NEW_NAME="$IMAGE_PATH/rae-${COUNTER}.webp"
            mv "$file" "$NEW_NAME"
            echo "Renamed $filename to rae-${COUNTER}.webp"
            COUNTER=$((COUNTER + 1))
        fi
    done
    
    print_status "New images prepared for upload"
}

# Main menu
show_menu() {
    echo ""
    echo "🐕 Rae's Image Management System"
    echo "=================================="
    echo "1) Upload images to S3"
    echo "2) Upload & invalidate cache"
    echo "3) List current images"
    echo "4) Download images from S3 (backup)"
    echo "5) Add & rename new images"
    echo "6) Full sync (add, upload, invalidate)"
    echo "0) Exit"
    echo ""
}

# Parse command line arguments
if [ $# -eq 0 ]; then
    # Interactive mode
    while true; do
        show_menu
        read -p "Select an option: " choice
        
        case $choice in
            1) upload_images ;;
            2) upload_images && invalidate_cache ;;
            3) list_images ;;
            4) download_images ;;
            5) add_images ;;
            6) add_images && upload_images && invalidate_cache ;;
            0) echo "Goodbye! 🐕"; exit 0 ;;
            *) print_error "Invalid option" ;;
        esac
    done
else
    # Command line mode
    case $1 in
        upload) upload_images ;;
        sync) upload_images && invalidate_cache ;;
        list) list_images ;;
        download) download_images ;;
        add) add_images ;;
        full) add_images && upload_images && invalidate_cache ;;
        *) 
            echo "Usage: $0 [upload|sync|list|download|add|full]"
            echo ""
            echo "Commands:"
            echo "  upload   - Upload images to S3"
            echo "  sync     - Upload images and invalidate cache"
            echo "  list     - List current images in S3"
            echo "  download - Download images from S3"
            echo "  add      - Add and rename new images"
            echo "  full     - Add new images, upload, and invalidate"
            exit 1
            ;;
    esac
fi