import { Stack, Typography, Modal, TextField, Paper, Button } from "@mui/material";
import { useState } from "react";
import HeroSummaryEdit from "./HeroSummaryEdit";

import sad_pepe from "../../assets/pepehands.png";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  minWidth: "800px",
  maxWidth: "1280px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditComposition = (props) => {
  let { editing, editingComp, setEditingComp, onSave, onClose, ow2Mode, ...others } = props;
  const [titleMissing, setTitleMissing] = useState(false);

  const titleHandler = (event) => {
    setTitleMissing(false);
    setEditingComp((old) => ({ ...old, title: event.target.value }));
  };
  const notesHandler = (event) => {
    setEditingComp((old) => ({ ...old, notes: event.target.value }));
  };
  const heroHandler = (hero, position) => {
    setEditingComp((old) => ({
      ...old,
      [position]: { ...old[position], hero: hero },
    }));
  };
  const playerHandler = (player, position) => {
    setEditingComp((old) => ({
      ...old,
      [position]: { ...old[position], player: player },
    }));
  };
  const callerHandler = (caller, position) => {
    setEditingComp((old) => ({
      ...old,
      [position]: { ...old[position], shotcaller: caller },
    }));
  };
  const trackerHandler = (tracker, position) => {
    setEditingComp((old) => ({
      ...old,
      [position]: { ...old[position], ulttracker: tracker },
    }));
  };

  const handleSave = () => {
    if (editingComp.title === "" || !editingComp.title) {
      setTitleMissing(true);
      return;
    }
    onSave(editingComp);
    onClose();
    setEditingComp(null);
  };

  const pepehands = (
    <img
      src={sad_pepe}
      alt="PEPE HANDS"
      style={{ filter: "grayscale(50%)", opacity: 0.5, width: "200px", transform: "translate(25%)rotate(-45deg)" }}
    />
  );

  return (
    <Modal open={editing} onClose={handleSave}>
      <Paper sx={modalStyle}>
        {editing ? (
          <Stack>
            <TextField
              label="Title"
              variant="outlined"
              value={editingComp.title}
              onChange={titleHandler}
              error={titleMissing}
            />
            <Stack direction="horizontal" sx={{ width: "100%", padding: "8px", paddingTop: "16px" }}>
              <Stack>
                <TextField
                  label="Notes"
                  multiline
                  value={editingComp.notes}
                  onChange={notesHandler}
                  rows={15}
                  size="small"
                  sx={{ width: "100%" }}
                />
                <Stack direction="horizontal" sx={{ padding: "16px" }}>
                  <Button variant="contained" sx={{ marginRight: "8px" }} onClick={handleSave}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </Stack>
              </Stack>
              <Stack sx={{ width: "80%", padding: "8px" }}>
                <Typography variant="h5" textAlign="center">
                  Edit Composition
                </Typography>
                <Stack direction="horizontal">
                  <Stack sx={{ width: "33%", padding: "8px" }}>
                    <HeroSummaryEdit
                      summary={editingComp.tank1}
                      position="tank1"
                      type="tank"
                      setHero={heroHandler}
                      setPlayer={playerHandler}
                      setCaller={callerHandler}
                      setTracker={trackerHandler}
                    />
                    {ow2Mode && pepehands}
                    {!ow2Mode && (
                      <HeroSummaryEdit
                        summary={editingComp.tank2}
                        position="tank2"
                        type="tank"
                        setHero={heroHandler}
                        setPlayer={playerHandler}
                        setCaller={callerHandler}
                        setTracker={trackerHandler}
                      />
                    )}
                  </Stack>
                  <Stack sx={{ width: "33%", padding: "8px" }}>
                    <HeroSummaryEdit
                      summary={editingComp.dps1}
                      position="dps1"
                      type="dps"
                      setHero={heroHandler}
                      setPlayer={playerHandler}
                      setCaller={callerHandler}
                      setTracker={trackerHandler}
                    />
                    <HeroSummaryEdit
                      summary={editingComp.dps2}
                      position="dps2"
                      type="dps"
                      setHero={heroHandler}
                      setPlayer={playerHandler}
                      setCaller={callerHandler}
                      setTracker={trackerHandler}
                    />
                  </Stack>
                  <Stack sx={{ width: "33%", padding: "8px" }}>
                    <HeroSummaryEdit
                      summary={editingComp.heal1}
                      position="heal1"
                      type="heal"
                      setHero={heroHandler}
                      setPlayer={playerHandler}
                      setCaller={callerHandler}
                      setTracker={trackerHandler}
                    />
                    <HeroSummaryEdit
                      summary={editingComp.heal2}
                      position="heal2"
                      type="heal"
                      setHero={heroHandler}
                      setPlayer={playerHandler}
                      setCaller={callerHandler}
                      setTracker={trackerHandler}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        ) : null}
      </Paper>
    </Modal>
  );
};

export default EditComposition;
