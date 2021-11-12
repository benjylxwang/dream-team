import {
  Button,
  CircularProgress,
  Divider,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useState } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  minWidth: "400px",
  maxWidth: "600px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LoadFromServer = (props) => {
  let { open, handleClose, handleData, ...others } = props;
  const [saveName, setSaveName] = useState();
  const [saveNameError, setSaveNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoad = () => {
    setErrorMessage('');
    // Validate password and savename
    if (saveName === undefined || saveName === "") {
      setSaveNameError(true);
    } else {
      // Save data to server & close
      setLoading(true);

      fetch(
        `https://script.google.com/macros/s/AKfycbySN3-H30iuUDvDlL-ExLiWARdgW9VPuYEfBGeyJdpixWHyzTNIup3RYbPKeX8IqW7H/exec?saveName=${saveName}`
      )
        .then((response) => response.json())
        .then((received) => {
          setLoading(false);
        //   console.log(received);

          if (received.result === "error") {
            setErrorMessage(received.message);
          } else {
            handleData(received.comps);
            handleClose();
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error", error);
        });
    }
  };

  return (
    <Modal open={open} {...others} onClose={handleClose}>
      <Paper sx={modalStyle}>
        <Stack>
          <Typography variant="h6">Load save from server</Typography>
          <Typography variant="subtitle2">CURRENT STATE WILL BE OVERWRITTEN!</Typography>
          <Divider sx={{ marginBottom: "8px" }} />
          <TextField
            value={saveName}
            onChange={(event) => {
                setSaveName(event.target.value);
                setSaveNameError(false);
            }}
            label="Save name"
            required
            error={saveNameError}
            sx={{ marginBottom: "8px" }}
          />
          <Stack direction="horizontal" sx={{ padding: "16px" }}>
            <Box sx={{ m: 1, position: "relative" }}>
              <Button
                variant="contained"
                disabled={loading}
                onClick={handleLoad}
              >
                Load
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
            <Button onClick={handleClose}>Cancel</Button>
          </Stack>
          {errorMessage && errorMessage !== "" ? (
            <Typography variant="subtitle2">Error: {errorMessage}</Typography>
          ) : null}
        </Stack>
      </Paper>
    </Modal>
  );
};

export default LoadFromServer;
