import useWebSocket from "react-use-websocket";
import CustomTable from "./shared/CustomTable";
import { styled } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const SyncedComp = styled("div")(({ isSynced }) => ({
  border: `1px solid ${isSynced ? "#ff4d4f" : "#52c41a"}`,
  borderRadius: 4,
  color: `${isSynced ? "#ff4d4f" : "#52c41a"}`,
  paddingInline: 7,
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  background: isSynced ? "#fff2f0" : "#f6ffed",
  width: "max-content",
  svg: {
    fontSize: 18,
    margin: "3px",
  },
}));

function App() {
  const headers = [
    { title: "Account Name", field: "accountId" },
    {
      title: "Strategy",
      field: "strategy",
    },
    { title: "Stock Name", field: "stockName" },
    {
      title: "Source P/L",
      field: "sourcePnL",
    },
    {
      title: "Dest P/L",
      field: "destinationPnL",
    },
    {
      title: "Sync Status",
      field: "isSynced",
      cellRenderer: (isSynced) => {
        return (
          <SyncedComp isSynced={isSynced}>
            {isSynced ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />}
            {isSynced ? "Out of Sync" : "Synced"}
          </SyncedComp>
        );
      },
    },
  ];

  const subColumns = [
    { title: "Symbol", field: "tradingSymbol" },
    {
      title: "Src QTY",
      field: "sourceHoldingQuantity",
    },
    {
      title: "Dest QTY",
      field: "destinationHoldingQuantity",
    },
    {
      title: "Source P/L",
      field: "sourcePnL",
    },
    {
      title: "Dest P/L",
      field: "destinationPnL",
    },
    {
      title: "Sync Status",
      field: "isSynced",
      cellRenderer: (isSynced) => {
        return (
          <SyncedComp isSynced={isSynced}>
            {isSynced ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />}
            {isSynced ? "Out of Sync" : "Synced"}
          </SyncedComp>
        );
      },
    },
  ];
  const { sendJsonMessage, getWebSocket, lastJsonMessage, lastMessage } =
    useWebSocket(`ws://35.207.237.255:8090/positions`, {
      shouldReconnect: () => true,
    });

  return (
    <>
      <h1 style={{ fontSize: 18 }}>Position Monitor</h1>
      <h2 style={{ fontSize: 16 }}>Positions</h2>
      <CustomTable
        headers={headers}
        subColumns={subColumns}
        data={lastJsonMessage?.portfolios || []}
      />
    </>
  );
}

export default App;
