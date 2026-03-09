import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Alert,
} from "@mui/material";

export default function App() {
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:5142/weatherforecast") //find in server properties -> applicationUrl for https in launchSettings.json
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data from the API.");  
                }
                return response.json();
            })
            .then((data) => {
                setForecastData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">BRC Dashboard</Typography>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6">Invoices</Typography>
                            <Typography>Total invoices: 124</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6">Customers</Typography>
                            <Typography>Total customers: 58</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6">Revenue</Typography>
                            <Typography>€12,450</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                ASP.NET Core API Data
                            </Typography>

                            {loading && <CircularProgress />}

                            {error && <Alert severity="error">{error}</Alert>}

                            {!loading && !error && (
                                <List>
                                    {forecastData.map((item, index) => (
                                        <ListItem key={index} divider>
                                            <ListItemText
                                                primary={`Date: ${item.date}`}
                                                secondary={`Temperature: ${item.temperatureC}°C | Summary: ${item.summary}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
