import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress,
    Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CheckerForm = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/accessibility/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: url, type: 'url' }),
            });

            if (!response.ok) {
                throw new Error('Failed to analyze website. Please try again.');
            }

            const result = await response.json();
            navigate('/results', { state: { report: result } });
        } catch (err) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom fontWeight="medium">
                Enter your website URL
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                InputProps={{
                    startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                }}
                sx={{ mb: 2 }}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading || !url}
                sx={{ py: 1.5 }}
            >
                {loading ? (
                    <CircularProgress size={24} color="inherit" />
                ) : (
                    'Check Accessibility'
                )}
            </Button>
            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
};

export default CheckerForm;