'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminUtilitiesPage() {
    const [seedLoading, setSeedLoading] = useState(false);
    const [seedResult, setSeedResult] = useState<string>('');
    const [migrateLoading, setMigrateLoading] = useState(false);
    const [migrateResult, setMigrateResult] = useState<string>('');
    const [testLoading, setTestLoading] = useState(false);
    const [testResult, setTestResult] = useState<string>('');

    const testCloudinary = async () => {
        setTestLoading(true);
        setTestResult('Testing Cloudinary configuration...');

        try {
            const response = await fetch('/api/test-cloudinary');
            const data = await response.json();

            if (data.success) {
                setTestResult(`✅ Cloudinary Test Successful!\n\nConfig:\n${JSON.stringify(data.config, null, 2)}\n\nTest Upload:\n• URL: ${data.testResult.uploadedUrl}\n• Public ID: ${data.testResult.publicId}`);
            } else {
                setTestResult(`❌ Cloudinary Test Failed!\n\nConfig:\n${JSON.stringify(data.config, null, 2)}\n\nError: ${data.error}`);
            }
        } catch (error) {
            setTestResult(`❌ Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setTestLoading(false);
        }
    };

    const migrateInstagramImages = async () => {
        setMigrateLoading(true);
        setMigrateResult('Migrating Instagram images to Cloudinary...');

        try {
            const response = await fetch('/api/migrate-instagram', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                const { summary, results } = data;
                let resultText = `✅ Migration Complete!\n\n`;
                resultText += `📊 Summary:\n`;
                resultText += `• Projects processed: ${summary.projectsProcessed}\n`;
                resultText += `• Total images: ${summary.totalImages}\n`;
                resultText += `• Successfully migrated: ${summary.successfulMigrations}\n`;
                resultText += `• Failed migrations: ${summary.failedMigrations}\n\n`;

                if (results.length > 0) {
                    resultText += `📋 Details:\n`;
                    results.forEach((project: { projectTitle: string; images: Array<{ originalUrl: string; newUrl: string; success: boolean; error?: string }> }) => {
                        resultText += `\n• ${project.projectTitle}:\n`;
                        project.images.forEach((img) => {
                            if (img.originalUrl !== img.newUrl) {
                                resultText += `  ✅ Migrated to Cloudinary\n`;
                            } else if (!img.success) {
                                resultText += `  ❌ Failed: ${img.error}\n`;
                            }
                        });
                    });
                }

                setMigrateResult(resultText);
            } else {
                setMigrateResult(`❌ Error: ${data.error}`);
            }
        } catch (error) {
            setMigrateResult(`❌ Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setMigrateLoading(false);
        }
    };

    const seedDatabase = async () => {
        setSeedLoading(true);
        setSeedResult('Seeding database...');

        try {
            const response = await fetch('/api/seed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                setSeedResult(`✅ Success! ${data.message}\n\nNew Projects:\n${data.projects.map((p: { title: string; imageCount: number }) => `• ${p.title} (${p.imageCount} images)`).join('\n')}`);
            } else {
                setSeedResult(`❌ Error: ${data.error}`);
            }
        } catch (error) {
            setSeedResult(`❌ Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setSeedLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
                <div className="mb-8">
                    <Link href="/admin" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                        ← Back to Admin
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Utilities</h1>
                </div>

                {/* Database Seeding Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Database Management</h2>

                    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 mb-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    <strong>Warning:</strong> This will replace all existing projects with sample woodworking projects that have proper image URLs.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={seedDatabase}
                        disabled={seedLoading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        {seedLoading ? 'Seeding Database...' : 'Seed Database with Sample Projects'}
                    </button>

                    {seedResult && (
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg border">
                            <h3 className="font-medium text-gray-900 mb-2">Result:</h3>
                            <pre className="whitespace-pre-wrap text-sm text-gray-700">{seedResult}</pre>
                        </div>
                    )}
                </div>

                {/* Instagram Image Migration Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Instagram Image Migration</h2>

                    <div className="border-l-4 border-blue-400 bg-blue-50 p-4 mb-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    <strong>Migration:</strong> This will upload all Instagram images to Cloudinary for reliable hosting. Original projects will be preserved with updated image URLs.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={migrateInstagramImages}
                        disabled={migrateLoading}
                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        {migrateLoading ? 'Migrating Images...' : 'Migrate Instagram Images to Cloudinary'}
                    </button>

                    {migrateResult && (
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg border">
                            <h3 className="font-medium text-gray-900 mb-2">Migration Result:</h3>
                            <pre className="whitespace-pre-wrap text-sm text-gray-700">{migrateResult}</pre>
                        </div>
                    )}
                </div>

                {/* Cloudinary Test Section */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Cloudinary Configuration Test</h2>

                    <div className="border-l-4 border-purple-400 bg-purple-50 p-4 mb-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-purple-700">
                                    <strong>Test:</strong> This will verify that Cloudinary is properly configured and can upload images.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={testCloudinary}
                        disabled={testLoading}
                        className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        {testLoading ? 'Testing Cloudinary...' : 'Test Cloudinary Configuration'}
                    </button>

                    {testResult && (
                        <div className="mt-6 p-4 bg-gray-100 rounded-lg border">
                            <h3 className="font-medium text-gray-900 mb-2">Test Result:</h3>
                            <pre className="whitespace-pre-wrap text-sm text-gray-700">{testResult}</pre>
                        </div>
                    )}
                </div>

                {/* Debug Information */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Debug Information</h2>
                    <p className="text-gray-600 mb-4">
                        Use these endpoints to debug issues:
                    </p>
                    <div className="space-y-2">
                        <div>
                            <a
                                href="/api/debug"
                                target="_blank"
                                className="text-blue-600 hover:text-blue-800 underline"
                            >
                                /api/debug
                            </a>
                            <span className="text-gray-500 ml-2">- Check database connection and project count</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}