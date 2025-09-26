/**
 * Instagram Migration Helper Script v2.0 (Updated for 2025)
 * 
 * This script helps you bulk migrate Instagram posts to your website.
 * Works with Instagram's current interface that blocks right-click.
 * Run this in your browser's console while on Instagram.
 */

(function () {
    console.log("🚀 Instagram Migration Helper v2.0 Loaded!");
    console.log("📸 Go to https://www.instagram.com/saththebuilder/ first");
    console.log("⚠️ Instagram blocks right-click - this script extracts images automatically!");

    // Function to extract data from currently visible posts
    function extractVisiblePosts() {
        const posts = [];

        // Multiple selectors for Instagram's various layouts
        const selectors = [
            'article a[href*="/p/"]',
            'a[href*="/p/"]',
            '[role="link"][href*="/p/"]',
            '._aagw a', // Instagram grid class
            '._ac7v a'  // Alternative grid class
        ];

        let postElements = [];
        for (const selector of selectors) {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                postElements = Array.from(elements);
                console.log(`✅ Found ${elements.length} posts using selector: ${selector}`);
                break;
            }
        }

        if (postElements.length === 0) {
            console.warn("❌ No posts found. Make sure you're on the Instagram profile page.");
            return [];
        }

        postElements.forEach((postLink, index) => {
            try {
                const img = postLink.querySelector('img');
                if (img && img.src && postLink.href) {
                    const caption = img.alt || '';
                    const postUrl = postLink.href;
                    let imageUrl = img.src;

                    // Check if this is a pure video/reel post (should be skipped)
                    const isPureVideo = postUrl.includes('/reel/') ||
                        postUrl.includes('/tv/') ||
                        (postLink.querySelector('[aria-label*="Reel"]') && !postLink.querySelector('img')) ||
                        (postLink.querySelector('svg[aria-label*="Reel"]') && !postLink.querySelector('img'));

                    // Skip pure video/reel posts
                    if (isPureVideo) {
                        console.log(`⏭️ Skipping pure video/reel post: ${postUrl}`);
                        return;
                    }

                    // For carousel posts (multiple images/videos), extract the first image
                    const isCarousel = postLink.querySelector('[aria-label*="carousel"]') ||
                        postLink.innerHTML.includes('carousel') ||
                        postLink.querySelector('.carousel') ||
                        postUrl.includes('/p/'); // Most carousel posts are /p/ URLs

                    if (isCarousel) {
                        console.log(`📸 Processing carousel post (extracting first image): ${postUrl}`);
                        // Use the first image found in carousel
                        const firstImg = postLink.querySelector('img');
                        if (firstImg && firstImg.src) {
                            imageUrl = firstImg.src;
                        }
                    }

                    // Try to get higher quality image URL
                    const srcset = img.srcset;
                    if (srcset) {
                        const urls = srcset.split(',').map(s => s.trim());
                        const highestRes = urls[urls.length - 1];
                        if (highestRes) {
                            imageUrl = highestRes.split(' ')[0];
                        }
                    }

                    // Validate image URL (Instagram URLs are valid even without file extensions)
                    if (!imageUrl || !imageUrl.startsWith('http')) {
                        console.warn(`⚠️ Invalid image URL for post ${index}: ${imageUrl}`);
                        return;
                    }

                    // Skip duplicate posts (same URL)
                    if (!posts.some(p => p.postUrl === postUrl)) {
                        posts.push({
                            index: posts.length + 1,
                            postUrl,
                            imageUrl,
                            caption,
                            suggestedTitle: extractTitle(caption),
                            suggestedTags: extractTags(caption),
                            type: 'image'
                        });
                    }
                }
            } catch (error) {
                console.warn(`Error processing post ${index}:`, error);
            }
        });

        return posts;
    }

    // Enhanced function to get individual post details
    function getPostDetails(postUrl) {
        console.log(`🔍 Opening post: ${postUrl}`);

        // Open post in new tab to extract full caption
        window.open(postUrl, '_blank');

        setTimeout(() => {
            console.log("💡 Copy the caption from the opened tab and use it in the migration tool!");
        }, 2000);

        return postUrl;
    }

    // Helper functions (same as before)
    function extractTitle(caption) {
        const lines = caption.split('\n').filter(line => line.trim());
        if (lines.length > 0) {
            const firstLine = lines[0].replace(/[📸🔨🪵✨🎯🔥💪⚡]/g, '').trim();
            if (firstLine.length > 5 && firstLine.length < 60) {
                return firstLine;
            }
        }

        // Fallback: extract from hashtags
        const hashtags = caption.match(/#[\w]+/g) || [];
        const woodworkingTags = hashtags.filter(tag => {
            const lowerTag = tag.toLowerCase();
            return ['#table', '#chair', '#shelf', '#cabinet', '#desk', '#walnut', '#oak', '#maple', '#cherry', '#furniture'].includes(lowerTag);
        });

        if (woodworkingTags.length > 0) {
            return woodworkingTags[0].replace('#', '').replace(/([A-Z])/g, ' $1').trim() + ' Project';
        }

        return "Custom Woodworking Project";
    }

    function extractTags(caption) {
        const hashtags = caption.match(/#[\w]+/g) || [];
        const woodworkingTags = hashtags
            .map(tag => tag.replace('#', ''))
            .filter(tag => {
                const lowerTag = tag.toLowerCase();
                return lowerTag.includes('wood') ||
                    lowerTag.includes('furniture') ||
                    lowerTag.includes('custom') ||
                    lowerTag.includes('handmade') ||
                    lowerTag.includes('craft') ||
                    ['table', 'chair', 'shelf', 'cabinet', 'desk', 'oak', 'walnut', 'maple', 'cherry', 'diy'].includes(lowerTag);
            })
            .slice(0, 6);

        if (woodworkingTags.length === 0) {
            return ['handcrafted', 'custom', 'woodworking'];
        }

        return woodworkingTags;
    }

    // Function to generate CSV data for bulk import
    function generateCSV(posts) {
        const headers = ['Title', 'Description', 'Tags', 'Image URL', 'Post URL'];
        const rows = [headers];

        posts.forEach(post => {
            const description = post.caption.replace(/\n/g, ' ').replace(/"/g, '""').substring(0, 500);
            const tags = post.suggestedTags.join(', ');

            rows.push([
                post.suggestedTitle,
                description,
                tags,
                post.imageUrl,
                post.postUrl
            ]);
        });

        return rows.map(row =>
            row.map(cell => `"${cell}"`).join(',')
        ).join('\n');
    }

    // Function to download CSV file
    function downloadCSV(csvContent, filename = 'instagram_posts.csv') {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    }

    // Function to automatically scroll and load more posts
    function loadMorePosts(callback) {
        console.log("📜 Scrolling to load more posts...");
        const initialCount = document.querySelectorAll('a[href*="/p/"]').length;

        window.scrollTo(0, document.body.scrollHeight);

        setTimeout(() => {
            const newCount = document.querySelectorAll('a[href*="/p/"]').length;
            console.log(`📊 Loaded ${newCount - initialCount} new posts`);

            if (newCount > initialCount) {
                // More posts loaded, scroll again
                loadMorePosts(callback);
            } else {
                // No more posts, execute callback
                console.log("✅ Finished loading all posts");
                callback();
            }
        }, 2000);
    }

    // Main functions to expose
    window.InstagramMigration = {
        // Extract posts visible on current page
        extractPosts: function () {
            const posts = extractVisiblePosts();
            console.log(`✅ Found ${posts.length} posts:`);
            console.table(posts.map(p => ({
                Title: p.suggestedTitle,
                Tags: p.suggestedTags.join(', '),
                URL: p.postUrl
            })));
            return posts;
        },

        // Download CSV of current posts
        downloadCSV: function () {
            const posts = extractVisiblePosts();
            if (posts.length === 0) {
                console.warn('❌ No posts found. Make sure you are on the Instagram profile page.');
                return;
            }

            const csv = generateCSV(posts);
            downloadCSV(csv, `saththebuilder_posts_${Date.now()}.csv`);
            console.log(`📥 Downloaded CSV with ${posts.length} posts`);
        },

        // Load all posts then download CSV
        downloadAllPosts: function () {
            console.log("🚀 Loading all posts (this may take a while)...");
            loadMorePosts(() => {
                this.downloadCSV();
            });
        },

        // Open individual post for manual copying
        openPost: function (index = 0) {
            const posts = extractVisiblePosts();
            if (posts[index]) {
                const post = posts[index];
                console.log(`📱 Opening post ${index + 1}: ${post.suggestedTitle}`);
                getPostDetails(post.postUrl);

                // Also log the data for easy copying
                console.log("📋 Post data:", {
                    imageUrl: post.imageUrl,
                    title: post.suggestedTitle,
                    tags: post.suggestedTags.join(', ')
                });

                return post;
            } else {
                console.warn(`❌ Post ${index + 1} not found`);
            }
        },

        // Get image URL for a specific post
        getImageUrl: function (index = 0) {
            const posts = extractVisiblePosts();
            if (posts[index]) {
                const imageUrl = posts[index].imageUrl;
                console.log(`🖼️ Image URL for post ${index + 1}:`);
                console.log(imageUrl);

                // Try to copy to clipboard
                navigator.clipboard?.writeText(imageUrl)
                    .then(() => console.log('✅ Image URL copied to clipboard!'))
                    .catch(() => console.log('⚠️ Could not copy to clipboard'));

                return imageUrl;
            }
        }
    };

    console.log("\n🎯 Available Commands:");
    console.log("InstagramMigration.extractPosts() - Show all visible posts");
    console.log("InstagramMigration.downloadCSV() - Download CSV of visible posts");
    console.log("InstagramMigration.downloadAllPosts() - Load all posts then download CSV");
    console.log("InstagramMigration.openPost(0) - Open first post in new tab");
    console.log("InstagramMigration.getImageUrl(0) - Get image URL for first post");
    console.log("\n💡 Scroll down to load more posts, then run commands again!");
    console.log("🚀 Pro tip: Use downloadAllPosts() to automatically load everything!");

})();