import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    Chip,
    Button,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const report = location.state?.report || { issues: [], recommendations: [] };

    const getSeverityIcon = (severity) => {
        switch (severity.toLowerCase()) {
            case 'high':
                return <ErrorIcon color="error" />;
            case 'medium':
                return <WarningIcon color="warning" />;
            default:
                return <InfoIcon color="info" />;
        }
    };

    return (
        <Container maxWidth="lg">
            <Box py={4}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                    sx={{ mb: 4 }}
                >
                    Back to Checker
                </Button>

                <Typography variant="h4" gutterBottom>
                    Accessibility Analysis Results
                </Typography>

                <Grid container spacing={4}>
                    {/* Summary Section */}
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Summary
                            </Typography>
                            <Box display="flex" gap={2}>
                                <Chip
                                    label={`${
                                        report.issues.filter(
                                            (i) => i.severity.toLowerCase() === 'high'
                                        ).length
                                    } Critical Issues`}
                                    color="error"
                                />
                                <Chip
                                    label={`${
                                        report.issues.filter(
                                            (i) => i.severity.toLowerCase() === 'medium'
                                        ).length
                                    } Warnings`}
                                    color="warning"
                                />
                                <Chip
                                    label={`${
                                        report.issues.filter(
                                            (i) => i.severity.toLowerCase() === 'low'
                                        ).length
                                    } Suggestions`}
                                    color="info"
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    {/* Issues Section */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Issues Found
                            </Typography>
                            <List>
                                {report.issues.map((issue, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemIcon>
                                                {getSeverityIcon(issue.severity)}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={issue.description}
                                                secondary={`Severity: ${issue.severity}`}
                                                primaryTypographyProps={{
                                                    style: { wordBreak: 'break-word' },
                                                }}
                                                secondaryTypographyProps={{
                                                    style: { wordBreak: 'break-word' },
                                                }}
                                            />
                                        </ListItem>
                                        {index < report.issues.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    {/* Recommendations Section */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Recommendations
                            </Typography>
                            <List>
                                {report.recommendations.map((rec, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText
                                                primary={rec.fix}
                                                secondary={rec.explanation}
                                                primaryTypographyProps={{
                                                    style: { wordBreak: 'break-word' },
                                                }}
                                                secondaryTypographyProps={{
                                                    style: { wordBreak: 'break-word' },
                                                }}
                                            />
                                        </ListItem>
                                        {index < report.recommendations.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    textAlign: 'center',
                    py: 8,
                    px: 2,
                    backgroundColor: 'grey.50',
                    borderRadius: 2,
                    mb: 8,
                }}
            >
                <Typography variant="h3" gutterBottom fontWeight="bold">
                    Start Your Accessibility Journey Today
                </Typography>
                <Typography variant="h6" paragraph color="text.secondary">
                    In-Depth Manual Accessibility Audits by Accessibility Experts. We've Got Your Back!
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    sx={{
                        mt: 2,
                        px: 3, // Add extra horizontal padding
                        py: 1.5, // Add extra vertical padding
                        fontSize: '1.25rem', // Increase font size
                        borderRadius: '8px', // Optional: Adjust border radius for a modern look
                    }}
                >
                    Get a quote
                </Button>
            </Box>
        </Container>
    );
};

export default ResultsPage;