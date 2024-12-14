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

                {/* Summary Section */}
                <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Summary
                    </Typography>
                    <Box display="flex" gap={2}>
                        <Chip
                            label={`${report.issues.filter(i => i.severity.toLowerCase() === 'high').length} Critical Issues`}
                            color="error"
                        />
                        <Chip
                            label={`${report.issues.filter(i => i.severity.toLowerCase() === 'medium').length} Warnings`}
                            color="warning"
                        />
                        <Chip
                            label={`${report.issues.filter(i => i.severity.toLowerCase() === 'low').length} Suggestions`}
                            color="info"
                        />
                    </Box>
                </Paper>

                <Grid container spacing={4}>
                    {report.issues.map((issue, index) => {
                        const rec = report.recommendations[index] || {};

                        return (
                            <Grid item xs={12} key={index}>
                                <Paper elevation={3} sx={{ p: 3 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Issue {index + 1}
                                    </Typography>

                                    <List>
                                        <ListItem alignItems="flex-start">
                                            <ListItemIcon>{getSeverityIcon(issue.severity)}</ListItemIcon>
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

                                        {issue.faultyCode && (
                                            <Box
                                                sx={{
                                                    bgcolor: 'grey.100',
                                                    p: 2,
                                                    my: 2,
                                                    borderRadius: 2,
                                                    fontFamily: 'monospace',
                                                    fontSize: '0.875rem',
                                                    whiteSpace: 'pre-wrap',
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                <Typography variant="subtitle2" gutterBottom>
                                                    Faulty Code:
                                                </Typography>
                                                <code>{issue.faultyCode}</code>
                                            </Box>
                                        )}

                                        <Divider sx={{ my: 2 }} />

                                        <Typography variant="h6" gutterBottom>
                                            Recommendation
                                        </Typography>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText
                                                primary={rec.recommendation || "No recommendation provided"}
                                                secondary={`Severity: ${rec.severity || issue.severity}`}
                                                primaryTypographyProps={{
                                                    style: { wordBreak: 'break-word' },
                                                }}
                                                secondaryTypographyProps={{
                                                    style: { wordBreak: 'break-word' },
                                                }}
                                            />
                                        </ListItem>

                                        {rec.correctCode && (
                                            <Box
                                                sx={{
                                                    bgcolor: 'grey.50',
                                                    p: 2,
                                                    my: 2,
                                                    borderRadius: 2,
                                                    fontFamily: 'monospace',
                                                    fontSize: '0.875rem',
                                                    whiteSpace: 'pre-wrap',
                                                    wordBreak: 'break-word',
                                                }}
                                            >
                                                <Typography variant="subtitle2" gutterBottom>
                                                    Correct Code:
                                                </Typography>
                                                <code>{rec.correctCode}</code>
                                            </Box>
                                        )}
                                    </List>
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Container>
    );
};

export default ResultsPage;