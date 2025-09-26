"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface InstagramPost {
    imageUrl: string;
    caption: string;
    suggestedTitle: string;
    suggestedTags: string[];
    suggestedDescription: string;
}

export default function InstagramMigrationPage() {
    const [imageUrl, setImageUrl] = useState("");
    const [caption, setCaption] = useState("");
    const [loading, setLoading] = useState(false);
    const [parsedPost, setParsedPost] = useState<InstagramPost | null>(null);
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        tags: [] as string[],
        images: [] as string[]
    });

    // Parse Instagram post data
    const parseInstagramPost = async () => {
        if (!imageUrl || !caption) return;

        setLoading(true);
        try {
            // Extract suggested data from caption
            const suggestedTitle = extractTitle(caption);
            const suggestedTags = extractTags(caption);
            const suggestedDescription = cleanDescription(caption);

            const post: InstagramPost = {
                imageUrl,
                caption,
                suggestedTitle,
                suggestedTags,
                suggestedDescription
            };

            setParsedPost(post);
            setProjectData({
                title: suggestedTitle,
                description: suggestedDescription,
                tags: suggestedTags,
                images: [imageUrl]
            });
        } catch (error) {
            console.error("Error parsing Instagram post:", error);
        } finally {
            setLoading(false);
        }
    };

    // Helper functions to extract data from Instagram captions
    const extractTitle = (caption: string): string => {
        // Look for common woodworking project patterns
        const lines = caption.split('\n').filter(line => line.trim());
        if (lines.length > 0) {
            const firstLine = lines[0].replace(/[📸🔨🪵✨🎯]/g, '').trim();
            if (firstLine.length > 5 && firstLine.length < 60) {
                return firstLine;
            }
        }
        return "Custom Woodworking Project";
    };

    const extractTags = (caption: string): string[] => {
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

        // Add some default tags if none found
        if (woodworkingTags.length === 0) {
            return ['handcrafted', 'custom'];
        }

        return woodworkingTags;
    };

    const cleanDescription = (caption: string): string => {
        // Remove hashtags and clean up description
        let description = caption.replace(/#[\w]+/g, '').trim();
        description = description.replace(/\s+/g, ' '); // Remove extra spaces
        description = description.split('\n').filter(line => line.trim()).join(' ');

        if (description.length > 500) {
            description = description.substring(0, 500) + '...';
        }

        return description || "Custom woodworking project crafted with attention to detail and quality materials.";
    };

    // Create project from parsed data
    const createProject = async () => {
        if (!projectData.title || !projectData.images[0]) return;

        setLoading(true);
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...projectData,
                    isPublished: true,
                    isFeatured: false
                })
            });

            if (response.ok) {
                await response.json();
                alert(`Project "${projectData.title}" created successfully!`);

                // Reset form
                setImageUrl("");
                setCaption("");
                setParsedPost(null);
                setProjectData({
                    title: "",
                    description: "",
                    tags: [],
                    images: []
                });
            } else {
                throw new Error('Failed to create project');
            }
        } catch (error) {
            console.error("Error creating project:", error);
            alert("Error creating project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-wood-600 dark:text-wood-300">Instagram Migration</h1>
                <div className="flex gap-3">
                    <Link href="/admin/bulk-import" className="px-4 py-2 rounded-xl bg-accent-500 text-white hover:bg-accent-600 text-sm font-medium">
                        📊 Bulk Import
                    </Link>
                    <Link href="/admin" className="text-sm underline hover:no-underline">← Back to Admin</Link>
                </div>
            </div>

            {/* Instructions */}
            <div className="rounded-2xl p-6 bg-wood-50 dark:bg-wood-900/10 border border-wood-200 dark:border-wood-800">
                <h2 className="text-lg font-semibold text-wood-600 dark:text-wood-300 mb-4">How to Migrate Instagram Posts</h2>
                <ol className="space-y-2 text-sm text-slatey-700 dark:text-slatey-200">
                    <li><strong>1.</strong> Go to <a href="https://www.instagram.com/saththebuilder/" target="_blank" className="text-wood-500 underline">@saththebuilder</a></li>
                    <li><strong>2.</strong> Right-click on an image and select &quot;Copy image address&quot;</li>
                    <li><strong>3.</strong> Copy the post caption text</li>
                    <li><strong>4.</strong> Paste both below and let the tool suggest project details</li>
                    <li><strong>5.</strong> Review and edit the suggestions, then create the project</li>
                </ol>
            </div>

            {/* Input Form */}
            <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                <h2 className="text-xl font-semibold text-wood-600 dark:text-wood-300 mb-4">Step 1: Paste Instagram Content</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Image URL</label>
                        <input
                            type="url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Paste the Instagram image URL here..."
                            className="w-full px-3 py-2 border border-slatey-300 dark:border-slatey-600 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Caption</label>
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            placeholder="Paste the Instagram caption here..."
                            rows={6}
                            className="w-full px-3 py-2 border border-slatey-300 dark:border-slatey-600 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                        />
                    </div>

                    <button
                        onClick={parseInstagramPost}
                        disabled={!imageUrl || !caption || loading}
                        className="px-6 py-2 bg-wood-500 text-white rounded-lg hover:bg-wood-600 disabled:opacity-50"
                    >
                        {loading ? "Parsing..." : "Parse Instagram Post"}
                    </button>
                </div>
            </div>

            {/* Preview and Edit */}
            {parsedPost && (
                <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                    <h2 className="text-xl font-semibold text-wood-600 dark:text-wood-300 mb-4">Step 2: Review & Edit Project Details</h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Image Preview */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Image Preview</label>
                            <div className="relative aspect-square rounded-lg overflow-hidden border border-slatey-200 dark:border-slatey-700">
                                <Image
                                    src={parsedPost.imageUrl}
                                    alt="Instagram image"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Project Details */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Project Title</label>
                                <input
                                    type="text"
                                    value={projectData.title}
                                    onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-slatey-300 dark:border-slatey-600 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    value={projectData.description}
                                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-slatey-300 dark:border-slatey-600 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    value={projectData.tags.join(', ')}
                                    onChange={(e) => setProjectData({
                                        ...projectData,
                                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                                    })}
                                    className="w-full px-3 py-2 border border-slatey-300 dark:border-slatey-600 rounded-lg focus:ring-2 focus:ring-wood-500 focus:border-transparent"
                                />
                            </div>

                            <button
                                onClick={createProject}
                                disabled={!projectData.title || loading}
                                className="w-full px-6 py-3 bg-wood-500 text-white rounded-lg hover:bg-wood-600 disabled:opacity-50 font-medium"
                            >
                                {loading ? "Creating Project..." : "Create Project"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Batch Migration Tips */}
            <div className="rounded-2xl p-6 bg-slatey-50 dark:bg-slatey-800/20 border border-slatey-200 dark:border-slatey-700">
                <h2 className="text-lg font-semibold text-wood-600 dark:text-wood-300 mb-4">💡 Tips for Efficient Migration</h2>
                <ul className="space-y-2 text-sm text-slatey-700 dark:text-slatey-200">
                    <li><strong>•</strong> Open Instagram in one tab and this tool in another for quick switching</li>
                    <li><strong>•</strong> Start with your best/most recent projects first</li>
                    <li><strong>•</strong> The tool auto-suggests titles and tags based on Instagram captions</li>
                    <li><strong>•</strong> You can always edit project details later in the main Admin panel</li>
                    <li><strong>•</strong> Consider marking your top 3-5 projects as &quot;Featured&quot; after creation</li>
                </ul>
            </div>
        </div>
    );
}