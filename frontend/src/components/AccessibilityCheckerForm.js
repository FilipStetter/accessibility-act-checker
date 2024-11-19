import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress,
    Alert,
} from '@mui/material';

const AccessibilityCheckerForm = () => {
    const [url, setUrl] = useState('');
    const [htmlContent, setHtmlContent] = useState('');
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        const content = htmlContent || url;
        setLoading(true);
        setReport(null);
        setError(null);

        try {
            const response = await fetch('/api/accessibility/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content }),
            });

            if (!response.ok) {
                throw new Error('Failed to analyze content. Please try again.');
            }

            const result = await response.json();
            console.log("Report received from backend:", result);

            // Normalize data structure
            const normalizedReport = {
                issues: result.issues || [],
                recommendations: result.recommendations || []
            };
            setReport(normalizedReport);
        } catch (err) {
            console.error('Error analyzing content:', err);
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-evenly"
            alignItems="flex-start"
            padding="2rem"
            minHeight="100vh"
            bgcolor="#f9fafc"
        >
            {/* Left: Input Section */}
            <Box flex={1} padding="2rem" maxWidth="40%">
                <Typography variant="h4" gutterBottom>
                    Accessibility Checker
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    Enter a website URL or paste HTML content to analyze its accessibility.
                </Typography>
                <TextField
                    label="Website URL"
                    placeholder="e.g., https://example.com"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <TextField
                    label="HTML Content"
                    placeholder="Paste your HTML code here"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={8}
                    margin="normal"
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={loading}
                    fullWidth
                    style={{ marginTop: '1rem' }}
                >
                    {loading ? 'Analyzing...' : 'Analyze'}
                </Button>
                {loading && (
                    <Box mt={2} display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                )}
                {error && (
                    <Box mt={2}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                )}
            </Box>

            {/* Right: Report Section */}
            <Box flex={1} padding="2rem" maxWidth="50%">
                {report ? (
                    <>
                        <Typography variant="h5" gutterBottom>
                            Accessibility Report
                        </Typography>

                        {/* Issues Section */}
                        <Typography variant="h6" gutterBottom>
                            Issues
                        </Typography>
                        {report.issues.length > 0 ? (
                            <ul>
                                {report.issues.map((issue, index) => (
                                    <li key={index}>
                                        <Typography variant="body1">
                                            <strong>{issue.description}</strong>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Severity: {issue.severity || 'N/A'}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="body2">No issues found.</Typography>
                        )}

                        {/* Recommendations Section */}
                        <Typography variant="h6" gutterBottom>
                            Recommendations
                        </Typography>
                        {report.recommendations.length > 0 ? (
                            <ul>
                                {report.recommendations.map((rec, index) => (
                                    <li key={index}>
                                        <Typography variant="body1">
                                            <strong>{rec.fix}</strong>
                                        </Typography>
                                        {rec.explanation && (
                                            <Typography variant="body2" color="textSecondary">
                                                {rec.explanation}
                                            </Typography>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="body2">No recommendations provided.</Typography>
                        )}
                    </>
                ) : (
                    <Typography variant="body1" color="textSecondary" textAlign="center">
                        Submit a URL or HTML content to see the accessibility report.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default AccessibilityCheckerForm;