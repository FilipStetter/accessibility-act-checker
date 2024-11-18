import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper, CircularProgress, Alert } from '@mui/material';

const AccessibilityCheckerForm = () => {
    const [url, setUrl] = useState('');
    const [htmlContent, setHtmlContent] = useState('');
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        const content = htmlContent || url;
        setLoading(true); // Set loading state to true
        setReport(null); // Clear previous report
        setError(null); // Clear previous errors

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
            setReport(result); // Update the report with the fetched result
        } catch (err) {
            console.error('Error analyzing content:', err);
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="#f9fafc"
        >
            <Paper elevation={3} style={{ padding: '2rem', maxWidth: '600px', width: '100%' }}>
                <Typography variant="h4" gutterBottom textAlign="center">
                    Accessibility Checker
                </Typography>
                <Typography variant="body2" color="textSecondary" textAlign="center" gutterBottom>
                    Analyze a website URL or HTML content for accessibility issues.
                </Typography>
                <TextField
                    label="Website URL"
                    placeholder="Enter the URL of the website"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <TextField
                    label="HTML Content"
                    placeholder="Paste your HTML content here"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={6}
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '1.5rem' }}
                    onClick={handleSubmit}
                    disabled={loading} // Disable button when loading
                >
                    {loading ? 'Analyzing...' : 'Analyze'}
                </Button>

                {loading && (
                    <Box display="flex" justifyContent="center" mt={2}>
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Box mt={2}>
                        <Alert severity="error">{error}</Alert>
                    </Box>
                )}

                {report && !loading && (
                    <Box mt={4}>
                        <Typography variant="h5" gutterBottom>
                            Accessibility Report
                        </Typography>
                        <Box mb={2}>
                            <Typography variant="h6" gutterBottom>
                                Issues
                            </Typography>
                            <ul style={{ paddingLeft: '1.5rem' }}>
                                {report.issues.length > 0 ? (
                                    report.issues.map((issue, index) => (
                                        <li key={index}>
                                            <Typography variant="body1">
                                                <strong>{issue.description}</strong>
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Severity: {issue.severity || 'N/A'}
                                            </Typography>
                                        </li>
                                    ))
                                ) : (
                                    <Typography variant="body2">No issues found.</Typography>
                                )}
                            </ul>
                        </Box>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Recommendations
                            </Typography>
                            <ul style={{ paddingLeft: '1.5rem' }}>
                                {report.recommendations.length > 0 ? (
                                    report.recommendations.map((rec, index) => (
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
                                    ))
                                ) : (
                                    <Typography variant="body2">No recommendations provided.</Typography>
                                )}
                            </ul>
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default AccessibilityCheckerForm;