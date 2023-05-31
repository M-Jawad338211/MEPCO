import { Box } from "@mui/material";
import { Drawer } from "@mui/material";
import Sidebar from "../components/sidebar";

export default function DuplicateBill() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240, borderTopRightRadius: '15px', backgroundColor: "#EAEFF5" },
                    }}
                // open
                >
                    <Sidebar />
                </Drawer>
            </Box>
        </Box>
    )
}