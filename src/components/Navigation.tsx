import React, { useEffect, useState } from "react";
import { 
  AppBar, 
  Box, 
  Button, 
  CssBaseline, 
  Divider, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Toolbar 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';

const drawerWidth = 240;
const navItems = [
  ['Career', 'career'],
  ['Projects', 'projects'],
  ['Design Portfolio', 'portfolio'],
  ['Contact Me', 'contact']
];

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger background change after 50px of scrolling
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    if (section === 'portfolio') {
      window.open("https://shaileeportfolio.my.canva.site/p", '_blank');
      return;
    }
    if (section === 'contact') {
      window.open("https://www.linkedin.com/in/shailee-patel/", '_blank');
      return;
    }
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar 
        component="nav" 
        elevation={0} 
        sx={{
          // Background is transparent initially, then Charcoal Black on scroll
          backgroundColor: scrolled ? '#1E1E1E' : 'transparent', 
          transition: 'all 0.4s ease-in-out',
          padding: scrolled ? '5px 0' : '15px 0',
          borderBottom: scrolled ? '1px solid #6B7280' : 'none'
        }}
      >
        <Toolbar className='nav-toolbar' sx={{ maxWidth: '1400px', width: '100%', margin: '0 auto', px: '4rem !important' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              display: { sm: 'none' }, 
              color: scrolled ? '#FAFAF8' : '#1E1E1E' 
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '24px', flex: 1, justifyContent: 'flex-end' }}>
            {navItems.map((item) => (
              <Button 
                key={item[0]} 
                onClick={() => scrollToSection(item[1])} 
                sx={{
                  // Text is Charcoal on white, then Off-White on Charcoal
                  color: scrolled ? '#FAFAF8' : '#1E1E1E',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#FF7A1A', // Papaya Orange accent on hover
                  }
                }}
              >
                {item[0]}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{ 
          display: { xs: 'block', sm: 'none' }, 
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            backgroundColor: '#FAFAF8',
            color: '#1E1E1E'
          } 
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 2 }}>
          <p style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <ListIcon/> Menu
          </p>
          <Divider sx={{ my: 2 }} />
          <List>
            {navItems.map((item) => (
              <ListItem key={item[0]} disablePadding>
                <ListItemButton 
                  sx={{ textAlign: 'center' }} 
                  onClick={() => scrollToSection(item[1])}
                >
                  <ListItemText 
                    primary={item[0]} 
                    primaryTypographyProps={{
                      fontWeight: 700,
                      fontFamily: "'Inter', sans-serif",
                      textTransform: 'uppercase'
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Navigation;