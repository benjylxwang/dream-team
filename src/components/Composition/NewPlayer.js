import { Modal, TextField, Paper, Button, Card, CardContent, CardActions } from "@mui/material";
import { useState } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "200px",
  maxWidth: "1280px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const NewPlayer = (props) => {
  let { editing, onSave, onCancel } = props;

  const [name, setName] = useState("");

  const handleSave = (event) => {
    event.preventDefault();
    if (onSave) onSave(name);
  };

  return (
    <Modal open={editing} onBackdropClick={onCancel}>
      <Card sx={modalStyle}>
        <form onSubmit={handleSave}>
          <CardContent>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              required
              inputProps={{ maxLength: 31 }}
              onChange={(event) => setName(event.target.value)}
            />
          </CardContent>
          <CardActions>
            <Button type="submit" variant="contained">
              Confirm
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  );
};

export default NewPlayer;
