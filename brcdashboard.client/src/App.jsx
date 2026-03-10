import React, { useEffect, useState, useMemo } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Paper,
    CircularProgress,
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    TableRow,
    TableCell,
    Table,
    TableHead,
    TableBody,
    TableContainer,
    TablePagination,
    List,
    ListItem,
    ListItemText,

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
    const totalRevenue = useMemo(() => {
        return invoiceData.reduce((total, item) => total + Number(item.amount || 0), 0); //Number () to ensure amount is treated as a number, defaulting to 0 if undefined
    }, [invoiceData]);
    const uniqueCustomers = useMemo(() => {
        return new Set(invoiceData.map((item) => item.customer_name)).size;
    }, [invoiceData]);

    const paidInvoices = useMemo(() => { 
        return invoiceData.filter((item) => item.status?.toLowerCase === "paid").length;
    }, [invoiceData]);

    const euroCurrency = (value) => {
        return new Intl.NumberFormat("en-IE", {
            style: "currency",
            currency: "EUR",
        }).format(value || 0);
    };

    const formatDate = (value) => {
        if (!value) return "-";
        return value.split("T")[0]; // Assuming date is in ISO format, this will return just the date part")
    };
    const getPaymentStatusColor = (status) => {
        const statusValue = status?.toLowerCase() || "";
        if (statusValue === "paid") return "success";
        if (statusValue === "overdue") return "error";
        if (statusValue === "pending") return "warning";
        return "default";
    };


    return (
        <>
            <AppBar position="static" elevation={1}>
                <Toolbar>
                    <Typography variant="h6">BRC Dashboard</Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{
                minHeight: "100vh",
                background: "linear-gradient(180deg, #f5f7fa 0%, #c3cfe2 100%)", 
                py:4,
            } }
            >
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3 }>
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
                                <Typography variant="h5" fontWeight="bold">{euroCurrency(totalRevenue)}</Typography>
                        </Paper>
                        </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary">Paid Invoices</Typography>
                                <Typography variant="h5" fontWeight="bold">{paidInvoices}</Typography>
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
                                                secondary={
                                                    <>
                                                        Amount: ${item.amount} |
                                                        Issue Date: ${formatDate(item.issue_date)}
                                                        | Due Date: ${formatDate(item.due_date)}
                                                        | Status: {""}
                                                        <Chip label={item.status}
                                                            color={getPaymentStatusColor(item.status)} size="small"
                                                        />
                                                    </>
                                                }  
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
                </Container>
            </Box>
        </>
    );
}
