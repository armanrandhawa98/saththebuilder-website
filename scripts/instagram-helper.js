/**
 * Instagram Bulk Migration Helper Script
 * 
 * This script helps you bulk migrate Instagram posts to your website.
 * Run this in your browser's console while on Instagram.
 */

(function () {
    console.log("🚀 Instagram Migration Helper Loaded!");
    console.log("📸 Go to https://www.instagram.com/saththebuilder/ first");

    // Function to extract data from currently visible posts
    function extractVisiblePosts() {
        const posts = [];

        // Find all post elements (Instagram's structure)
        const postElements = document.querySelectorAll('article a[href*="/p/"]');

        postElements.forEach((postLink, index) => {
            try {
                const img = postLink.querySelector('img');
                if (img && img.src) {
                    const caption = img.alt || '';
                    const postUrl = postLink.href;
                    const imageUrl = img.src;

                    posts.push({
                        index: index + 1,
                        postUrl,
                        imageUrl,
                        caption,
                        suggestedTitle: extractTitle(caption),
                        suggestedTags: extractTags(caption)
                    });
                }
            } catch (error) {
                console.warn(`Error processing post ${index}:`, error);
            }
        });

        return posts;
    }

    // Helper functions (same as in the React component)
    function extractTitle(caption) {
        const lines = caption.split('\n').filter(line => line.trim());
        if (lines.length > 0) {
            const firstLine = lines[0].replace(/[📸🔨🪵✨🎯]/g, '').trim();
            if (firstLine.length > 5 && firstLine.length < 60) {
                return firstLine;
            }
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
                    ['table', 'chair', 'shelf', 'cabinet', 'desk', 'oak', 'walnut', 'maple', 'cherry'].includes(lowerTag);
            })
            .slice(0, 6);

        if (woodworkingTags.length === 0) {
            return ['handcrafted', 'custom'];
        }

        return woodworkingTags;
    }

    // Function to generate CSV data for bulk import
    function generateCSV(posts) {
        const headers = ['Title', 'Description', 'Tags', 'Image URL', 'Post URL'];
        const rows = [headers];

        posts.forEach(post => {
            const description = post.caption.replace(/\n/g, ' ').replace(/"/g, '""');
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
        }
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

        // Copy data for manual entry
        copyForManual: function (index = 0) {
            const posts = extractVisiblePosts();
            if (posts[index]) {
                const post = posts[index];
                const data = {
                    imageUrl: post.imageUrl,
                    title: post.suggestedTitle,
                    description: post.caption.replace(/\n/g, ' '),
                    tags: post.suggestedTags.join(', ')
                };

                console.log(`📋 Post ${index + 1} data copied to clipboard:`);
                console.log(data);

                // Try to copy to clipboard
                navigator.clipboard?.writeText(JSON.stringify(data, null, 2))
                    .then(() => console.log('✅ Copied to clipboard!'))
                    .catch(() => console.log('⚠️ Could not copy to clipboard, but data is shown above'));

                return data;
            } else {
                console.warn(`❌ Post ${index + 1} not found`);
            }
        }
    };

    console.log("\n🎯 Available Commands:");
    console.log("InstagramMigration.extractPosts() - Show all visible posts");
    console.log("InstagramMigration.downloadCSV() - Download CSV file");
    console.log("InstagramMigration.copyForManual(0) - Copy first post data");
    console.log("\n💡 Scroll down to load more posts, then run commands again!");

})();