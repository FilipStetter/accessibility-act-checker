import React from 'react';
import {
    Container,
    Grid,
    Typography,
    Paper,
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import CheckerForm from '../components/CheckerForm';

const HomePage = () => {
    return (
        <>
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
                    color: 'white',
                    py: 8,
                    mb: 6,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                                Web Accessibility Checker
                            </Typography>
                            <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                                Test your website against WCAG 2.2 guidelines and ensure digital inclusion for all users.
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'grey.100',
                                    },
                                }}
                            >
                                Start Free Check
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 4,
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                }}
                            >
                                <CheckerForm />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Benefits Section */}
            <Container maxWidth="lg">
                <Box sx={{ mb: 8 }}>
                    <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
                        Why Choose Our Tool?
                    </Typography>
                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    backgroundColor: 'grey.50',
                                    borderRadius: 2,
                                }}
                            >
                                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                                    <AccessibilityNewIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                                    <Typography variant="h5" gutterBottom fontWeight="bold">
                                        WCAG 2.2 Compliant
                                    </Typography>
                                    <Typography>
                                        Up-to-date checks against all WCAG 2.2 success criteria for comprehensive coverage.
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    backgroundColor: 'grey.50',
                                    borderRadius: 2,
                                }}
                            >
                                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                                    <SpeedIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                                    <Typography variant="h5" gutterBottom fontWeight="bold">
                                        Real-time Results
                                    </Typography>
                                    <Typography>
                                        Get instant feedback and actionable recommendations for your website.
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 4,
                                    height: '100%',
                                    backgroundColor: 'grey.50',
                                    borderRadius: 2,
                                }}
                            >
                                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                                    <SecurityIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                                    <Typography variant="h5" gutterBottom fontWeight="bold">
                                        ADA Compliance
                                    </Typography>
                                    <Typography>
                                        Ensure your website meets legal requirements and avoid potential lawsuits.
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                {/* Features Section */}
                <Box sx={{ mb: 8 }}>
                    <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
                        Comprehensive Testing
                    </Typography>
                    <Grid container spacing={6} sx={{ mt: 4 }}>
                        <Grid item xs={12} md={6}>
                            <List>
                                {[
                                    'Color contrast analysis',
                                    'Alt text verification',
                                    'Keyboard navigation testing',
                                    'ARIA attributes validation',
                                ].map((feature, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <CheckCircleOutlineIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary={feature} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <List>
                                {[
                                    'Form accessibility checks',
                                    'Document structure analysis',
                                    'Mobile responsiveness',
                                    'Screen reader compatibility',
                                ].map((feature, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            <CheckCircleOutlineIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText primary={feature} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </Box>

                {/* CTA Section */}
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
        </>
    );
};

export default HomePage;