import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardContent, AppBar, Toolbar, Box } from "@mui/material";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/content") // Fetch content from backend
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  if (!data) return <Typography sx={{ textAlign: "center", mt: 5 }}>Loading...</Typography>;

  return (
    <Box 
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden", // Prevent horizontal scroll
        overflowY: "auto", // Allow vertical scroll when necessary
      }}
    >
      {/* Navbar - Full Width Without Overflow */}
      <AppBar position="sticky" sx={{ background: "linear-gradient(90deg, #0061ff, #60efff)", width: "100%" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
            {data.appName}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Banner Section - Full Viewport Height Without Overflow */}
      <Box
        sx={{
          backgroundImage: `url(${data.bannerImage})`,
          height: "100vh",
          width: "100vw",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          overflow: "hidden", // Prevent overflow from content
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
            zIndex: 1
          }
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", position: "relative", zIndex: 2 }}>
          {data.tagline}
        </Typography>
      </Box>

      {/* Main Content - Auto Fit Without Causing Scroll */}
      <Container sx={{ flex: 1, py: 4, maxWidth: "1200px" }}>
        {/* Services Section */}
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}>
          Our Services
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {data.services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ p: 2, borderRadius: 2, boxShadow: 3, textAlign: "center", transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0061ff" }}>{service.title}</Typography>
                  <Typography sx={{ mt: 1 }}>{service.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* FAQ Section */}
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", mt: 5 }}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ maxWidth: "800px", mx: "auto" }}>
          {data.faqs.map((faq, index) => (
            <Box key={index} sx={{ mb: 3, p: 2, borderRadius: 2, boxShadow: 1, bgcolor: "#f5f5f5" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>{faq.question}</Typography>
              <Typography sx={{ mt: 1 }}>{faq.answer}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default App;
