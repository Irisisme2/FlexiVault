/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import XfiStaking from "views/admin/Crossfi/components/XfiStaking";
import GovernanceParticipation from "views/admin/Crossfi/components/GovernanceParticipation";
import XFITransactionHistory from "views/admin/Crossfi/components/XFITransactionHistory";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    <SimpleGrid
      mb='20px'
      columns={{ sm: 1, md: 2 }} // Two columns for small and medium screens
      spacing={{ base: "20px", xl: "20px" }}
    >
      <XfiStaking />
      <GovernanceParticipation />
    </SimpleGrid>
    
    {/* Full-width Transaction History */}
    <Box width="100%">
      <XFITransactionHistory />
    </Box>
  </Box>
  );
}
