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

const SaveToServer = (props) => {
  let { data, open, handleClose, ...others } = props;
  const [saveName, setSaveName] = useState();
  const [password, setPassword] = useState();
  const [saveNameError, setSaveNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = () => {
      setErrorMessage('');
    // Validate password and savename
    let valid = true;
    if (saveName === undefined || saveName === "") {
      setSaveNameError(true);
      valid = false;
    }
    if (password === undefined || password === "") {
      setPasswordError(true);
      valid = false;
    }

    if (valid) {
      // Save data to server & close
      setLoading(true);

      const formData = new URLSearchParams({
        saveName: saveName,
        password: password,
        comps: JSON.stringify(data),
      });

      fetch(
        `https://script.google.com/macros/s/AKfycbySN3-H30iuUDvDlL-ExLiWARdgW9VPuYEfBGeyJdpixWHyzTNIup3RYbPKeX8IqW7H/exec`,
        {
          method: "POST",
          redirect: "follow",
          body: formData,
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
        .then((response) => response.json())
        .then((received) => {
          setLoading(false);
        //   console.log(received);

          if (received.result === "error") {
            setErrorMessage(received.message);
          } else {
            handleClose(true);
          }
        })
        .catch((error) => {
          setLoading(false);
        //   console.error("Error", error);
        });
    }
  };

  return (
    <Modal open={open} {...others} onClose={handleClose}>
      <Paper sx={modalStyle}>
        <Stack>
          <Typography variant="h6">Save current status to server</Typography>
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
          <TextField
            value={password}
            onChange={(event) => {
                setPassword(event.target.value);
                setPasswordError(false);
            }}
            label="Password"
            required
            error={passwordError}
            helperText="Use this password later to overwrite a save"
          />
          <Stack direction="horizontal" sx={{ padding: "16px" }}>
            <Box sx={{ m: 1, position: "relative" }}>
              <Button
                variant="contained"
                disabled={loading}
                onClick={handleSave}
              >
                Save
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

export default SaveToServer;
