"use client";

import { useState } from "react";
import Link from "next/link";

export default function BulkImportPage() {
    const [csvData, setCsvData] = useState<Record<string, string>[]>([]);
    const [importing, setImporting] = useState(false);
    const [results, setResults] = useState<{ success: number, errors: string[] }>({ success: 0, errors: [] });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'text/csv') {
            const reader = new FileReader();
            reader.onload = (event) => {
                const csv = event.target?.result as string;
                const lines = csv.split('\n').filter(line => line.trim());

                // Proper CSV parsing to handle quoted fields with commas
                const parseCSVLine = (line: string): string[] => {
                    const result: string[] = [];
                    let current = '';
                    let inQuotes = false;

                    for (let i = 0; i < line.length; i++) {
                        const char = line[i];
                        const nextChar = line[i + 1];

                        if (char === '"') {
                            if (inQuotes && nextChar === '"') {
                                // Escaped quote
                                current += '"';
                                i++; // Skip next quote
                            } else {
                                // Toggle quote state
                                inQuotes = !inQuotes;
                            }
                        } else if (char === ',' && !inQuotes) {
                            // Field separator
                            result.push(current.trim());
                            current = '';
                        } else {
                            current += char;
                        }
                    }

                    result.push(current.trim());
                    return result;
                };

                const headers = parseCSVLine(lines[0]);
                console.log('CSV Headers:', headers);

                const data = lines.slice(1)
                    .filter(line => line.trim())
                    .map((line, index) => {
                        const values = parseCSVLine(line);
                        const obj: Record<string, string> = {};
                        headers.forEach((header, headerIndex) => {
                            obj[header] = values[headerIndex] || '';
                        });

                        // Debug logging for first few rows
                        if (index < 3) {
                            console.log(`Row ${index + 1}:`, {
                                Title: obj['Title'],
                                Description: obj['Description']?.substring(0, 100) + '...',
                                'Image URL': obj['Image URL'],
                                'Post URL': obj['Post URL']
                            });
                        }

                        return obj;
                    });

                setCsvData(data);
            };

            reader.readAsText(file);
        }
    };

    const importProjects = async () => {
        if (csvData.length === 0) return;

        setImporting(true);
        const results: { success: number, errors: string[] } = { success: 0, errors: [] };

        for (const row of csvData) {
            try {
                // Validate image URL
                const imageUrl = row['Image URL'] || row.imageUrl || '';
                const isValidImageUrl = imageUrl &&
                    (imageUrl.startsWith('http') || imageUrl.startsWith('https')) &&
                    (imageUrl.includes('cdninstagram.com') || imageUrl.includes('instagram.com') || imageUrl.match(/\.(jpg|jpeg|png|webp|gif)/i));

                if (!isValidImageUrl) {
                    results.errors.push(`${row.Title || 'Unknown'}: Invalid or missing image URL - "${imageUrl}"`);
                    continue;
                }

                const projectData = {
                    title: row.Title || row.title || 'Untitled Project',
                    description: row.Description || row.description || '',
                    tags: (row.Tags || row.tags || '').split(',').map((t: string) => t.trim()).filter((t: string) => t),
                    images: [imageUrl],
                    isPublished: true,
                    isFeatured: false
                };

                const response = await fetch('/api/projects', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(projectData)
                });

                if (response.ok) {
                    results.success++;
                } else {
                    const errorText = await response.text();
                    let errorMessage = errorText;

                    // Try to parse JSON error for better error messages
                    try {
                        const errorJson = JSON.parse(errorText);
                        if (errorJson.error) {
                            errorMessage = errorJson.error;
                        }
                    } catch {
                        // Keep original error text if JSON parsing fails
                    }

                    results.errors.push(`${projectData.title}: ${errorMessage}`);
                }
            } catch (error) {
                results.errors.push(`${row.Title || 'Unknown'}: ${String(error)}`);
            }
        }

        setResults(results);
        setImporting(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-wood-600 dark:text-wood-300">Bulk Import</h1>
                <Link href="/admin" className="text-sm underline hover:no-underline">← Back to Admin</Link>
            </div>

            {/* Instructions */}
            <div className="rounded-2xl p-6 bg-wood-50 dark:bg-wood-900/10 border border-wood-200 dark:border-wood-800">
                <h2 className="text-lg font-semibold text-wood-600 dark:text-wood-300 mb-4">CSV Import Instructions</h2>
                <div className="space-y-4 text-sm text-slatey-700 dark:text-slatey-200">
                    <p><strong>Option 1: Use Browser Script</strong></p>
                    <ol className="ml-4 space-y-1">
                        <li>1. Go to <a href="https://www.instagram.com/saththebuilder/" target="_blank" className="text-wood-500 underline">@saththebuilder</a></li>
                        <li>2. Open browser console (F12)</li>
                        <li>3. Copy and paste the script from <code>scripts/instagram-helper.js</code></li>
                        <li>4. Run <code>InstagramMigration.downloadCSV()</code></li>
                        <li>5. Upload the downloaded CSV file below</li>
                    </ol>

                    <p><strong>Option 2: Manual CSV</strong></p>
                    <p>Create a CSV with columns: Title, Description, Tags, Image URL</p>
                </div>
            </div>

            {/* File Upload */}
            <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                <h2 className="text-xl font-semibold text-wood-600 dark:text-wood-300 mb-4">Upload CSV File</h2>

                <div className="space-y-4">
                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-slatey-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-wood-50 file:text-wood-700 hover:file:bg-wood-100"
                    />

                    {csvData.length > 0 && (
                        <div className="bg-slatey-50 dark:bg-slatey-800/50 rounded-lg p-4">
                            <p className="text-sm font-medium mb-2">Preview: {csvData.length} projects found</p>
                            <div className="max-h-60 overflow-y-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left p-2">Title</th>
                                            <th className="text-left p-2">Tags</th>
                                            <th className="text-left p-2">Has Image</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {csvData.slice(0, 10).map((row, i) => (
                                            <tr key={i} className="border-b">
                                                <td className="p-2">{row.Title || row.title || 'Untitled'}</td>
                                                <td className="p-2">{(row.Tags || row.tags || '').substring(0, 30)}...</td>
                                                <td className="p-2">{row['Image URL'] || row.imageUrl ? '✅' : '❌'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {csvData.length > 10 && (
                                    <p className="text-xs text-slatey-500 mt-2">... and {csvData.length - 10} more</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {csvData.length > 0 && (
                    <button
                        onClick={importProjects}
                        disabled={importing}
                        className="mt-4 px-6 py-3 bg-wood-500 text-white rounded-lg hover:bg-wood-600 disabled:opacity-50 font-medium"
                    >
                        {importing ? "Importing..." : `Import ${csvData.length} Projects`}
                    </button>
                )}
            </div>

            {/* Results */}
            {results.success > 0 || results.errors.length > 0 ? (
                <div className="rounded-2xl p-6 bg-white/70 dark:bg-slatey-800/60 shadow-soft border border-slatey-200/60 dark:border-slatey-700/60">
                    <h2 className="text-xl font-semibold text-wood-600 dark:text-wood-300 mb-4">Import Results</h2>

                    {results.success > 0 && (
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 mb-4">
                            <p className="text-green-800 dark:text-green-200 font-medium">
                                ✅ Successfully imported {results.success} projects!
                            </p>
                        </div>
                    )}

                    {results.errors.length > 0 && (
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                            <p className="text-red-800 dark:text-red-200 font-medium mb-2">
                                ❌ {results.errors.length} errors occurred:
                            </p>
                            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                                {results.errors.map((error, i) => (
                                    <li key={i}>• {error}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-4 flex gap-3">
                        <Link
                            href="/admin"
                            className="px-4 py-2 bg-wood-500 text-white rounded-lg hover:bg-wood-600 font-medium"
                        >
                            Back to Admin
                        </Link>
                        <Link
                            href="/gallery"
                            target="_blank"
                            className="px-4 py-2 border border-wood-300 dark:border-wood-600 rounded-lg hover:bg-wood-50 dark:hover:bg-wood-900/20 font-medium"
                        >
                            View Gallery
                        </Link>
                    </div>
                </div>
            ) : null}
        </div>
    );
}