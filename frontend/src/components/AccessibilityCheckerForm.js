import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';

const AccessibilityCheckerForm = () => {
    const [url, setUrl] = useState('');
    const [htmlContent, setHtmlContent] = useState('');
    const [report, setReport] = useState(null);

    const handleSubmit = async () => {
        const content = htmlContent || url;
        try {
            const response = await fetch('/api/accessibility/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content }),
            });
            const result = await response.json();
            setReport(result);
        } catch (error) {
            console.error('Error analyzing content:', error);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="#f4f4f9"
        >
            <Paper elevation={3} style={{ padding: '2rem', maxWidth: '500px', width: '100%' }}>
                <Typography variant="h4" gutterBottom>
                    Accessibility Checker
                </Typography>
                <TextField
                    label="Website URL"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <TextField
                    label="HTML Content"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '1rem' }}
                    onClick={handleSubmit}
                >
                    Analyze
                </Button>

                {report && (
                    <Box mt={4}>
                        <Typography variant="h6">Accessibility Report</Typography>
                        <ul>
                            {(report.issues || []).map((issue, index) => (
                                <li key={index}>
                                    {issue.description} - Element: {issue.element || 'N/A'}
                                </li>
                            ))}
                        </ul>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default AccessibilityCheckerForm;