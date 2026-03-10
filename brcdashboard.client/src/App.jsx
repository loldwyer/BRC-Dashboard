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
    const [invoiceData, setInvoiceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/invoices") //find in server properties -> applicationUrl for https in launchSettings.json
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch invoice data from the API.");  
                }
                return response.json();
            })
            .then((data) => {
                setInvoiceData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);
    const totalRevenue = invoiceData.reduce((total, item) => total + item.amount, 0);
    const uniqueCustomers = new Set(invoiceData.map((item) => item.customer_name)).size;

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
                            <Typography>Total invoices: {invoiceData.length}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6">Customers</Typography>
                            <Typography>Total customers: {uniqueCustomers}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6">Revenue</Typography>
                            <Typography>EURO {totalRevenue}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Invoice API Data
                            </Typography>

                            {loading && <CircularProgress />}

                            {error && <Alert severity="error">{error}</Alert>}

                            {!loading && !error && (
                                <List>
                                    {invoiceData.map((item, index) => (
                                        <ListItem key={index} divider>
                                            <ListItemText
                                                primary={`Invoice: ${item.invoice_number} | Customer: ${item.customer_name}`}
                                                secondary={`Amount: ${item.amount} | Issue Date: ${item.issue_date.split("T")[0]} | Due Date: ${item.due_date.split("T")[0]} | Status: ${item.status}`}
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
