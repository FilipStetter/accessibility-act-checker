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
            case 'critical':
                return <ErrorIcon color="error" />;
            case 'high':
                return <WarningIcon color="warning" />;
            case 'medium':
            default:
                return <InfoIcon color="info" />;
        }
    };

    const severityOrder = {
        critical: 1,
        high: 2,
        medium: 3,
    };

    const sortedIssues = report.issues
        .map((issue, index) => ({
            ...issue,
            recommendation: report.recommendations[index],
        }))
        .sort((a, b) => {
            const aSeverity = severityOrder[a.severity.toLowerCase()] || 99;
            const bSeverity = severityOrder[b.severity.toLowerCase()] || 99;
            return aSeverity - bSeverity;
        });

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
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Summary
                            </Typography>
                            <Box display="flex" gap={2}>
                                <Chip
                                    label={`${
                                        report.issues.filter(
                                            (i) => i.severity.toLowerCase() === 'critical'
                                        ).length
                                    } Critical Issues`}
                                    color="error"
                                />
                                <Chip
                                    label={`${
                                        report.issues.filter(
                                            (i) => i.severity.toLowerCase() === 'high'
                                        ).length
                                    } Warnings`}
                                    color="warning"
                                />
                                <Chip
                                    label={`${
                                        report.issues.filter(
                                            (i) => i.severity.toLowerCase() === 'medium'
                                        ).length
                                    } Suggestions`}
                                    color="info"
                                />
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Issues & Recommendations
                        </Typography>

                        {sortedIssues.map((issue, index) => {
                            const severity = issue.severity.toLowerCase();
                            const icon = getSeverityIcon(issue.severity);

                            return (
                                <Paper
                                    key={index}
                                    elevation={2}
                                    sx={{
                                        p: 3,
                                        mb: 3,
                                        borderLeft: `6px solid ${
                                            severity === 'critical'
                                                ? '#d32f2f'
                                                : severity === 'high'
                                                    ? '#ed6c02'
                                                    : '#0288d1'
                                        }`,
                                    }}
                                >
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <Box mr={1}>{icon}</Box>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Issue {index + 1}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body1" sx={{ mb: 1 }}>
                                        {issue.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        Severity: {issue.severity}
                                    </Typography>

                                    {issue.recommendation && (
                                        <>
                                            <Typography
                                                variant="subtitle2"
                                                fontWeight="bold"
                                                color="primary"
                                                gutterBottom
                                                mt={2}
                                            >
                                                Recommendation
                                            </Typography>
                                            <Typography variant="body1" sx={{ mb: 1 }}>
                                                {issue.recommendation.fix}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {issue.recommendation.explanation}
                                            </Typography>
                                        </>
                                    )}
                                </Paper>
                            );
                        })}
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default ResultsPage;