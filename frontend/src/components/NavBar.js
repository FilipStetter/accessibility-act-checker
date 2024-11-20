import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

const Navbar = () => {
    return (
        <AppBar position="sticky" color="default" elevation={0} sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                        <AccessibilityNewIcon sx={{ color: 'primary.main', mr: 1, fontSize: 32 }} />
                        <Typography
                            variant="h6"
                            component={RouterLink}
                            to="/"
                            sx={{
                                textDecoration: 'none',
                                color: 'text.primary',
                                fontWeight: 700,
                            }}
                        >
                            Accessibility Checker
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button color="inherit" component={RouterLink} to="/">
                            Home
                        </Button>
                        <Button color="inherit">
                            Documentation
                        </Button>
                        <Button variant="contained" color="primary">
                            Get Started
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
