import {
  Stack,
  Typography,
  Modal,
  TextField,
  Paper,
  Button,
  Fab,
} from "@mui/material";
import { useRef, useState } from "react";
import CompositionSummary from "../components/Composition/CompositionSummary";
import HeroSummaryEdit from "../components/Composition/HeroSummaryEdit";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import ReactToPrint from "react-to-print";
import PrintIcon from '@mui/icons-material/Print';

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

const Compositions = (props) => {
  let { ...others } = props;

  const printRef = useRef();
  const [comps, setComps] = useState([]);
  const [titleMissing, setTitleMissing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingComp, setEditingComp] = useState(null);
  const handleClose = () => setEditing(false);
  const startEditing = (comp) => {
    if (comp) {
      setEditingComp(comp);
    }
    // New
    else
      setEditingComp({
        title: "",
        notes: "",
        tank1: { hero: "", player: "" },
        tank2: { hero: "", player: "" },
        dps1: { hero: "", player: "" },
        dps2: { hero: "", player: "" },
        heal1: { hero: "", player: "" },
        heal2: { hero: "", player: "" },
      });
    setEditing(true);
  };
  const handleSave = () => {
    if (editingComp.title === "" || !editingComp.title) {
      setTitleMissing(true);
      return;
    }
    for (let comp in comps) {
      if (comps[comp].id === editingComp.id) {
        // Save edits
        comps[comp] = editingComp;
        handleClose();
        setEditingComp(null);
        return;
      }
    }

    // Save new comp
    setComps((old) => [...old, { ...editingComp, id: Math.random() }]);
    handleClose();
    setEditingComp(null);
  };
  const handleDelete = (compId) => {
    let newComps = [];
    for (let comp of comps) {
      if (comp.id !== compId) {
        newComps.push(comp);
      }
    }
    setComps(newComps);
  };

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
  const loadFileData = () => {
    let compString = localStorage.getItem("compositions");
    setComps(JSON.parse(compString));
  };
  const saveFileData = () => {
    localStorage.setItem("compositions", JSON.stringify(comps));
  };

  return (
    <div>
      <Stack {...others} ref={printRef}>
        {comps.map((comp) => (
          <CompositionSummary
            key={comp.title}
            comp={comp}
            onEditClick={startEditing}
            onDeleteClick={handleDelete}
          />
        ))}
      </Stack>
      <Fab color="primary" onClick={() => startEditing(null)}>
        <AddIcon />
      </Fab>
      <Fab color="secondary" onClick={saveFileData}>
        <SaveIcon />
      </Fab>
      <Fab color="secondary" onClick={loadFileData}>
        <OpenInBrowserIcon />
      </Fab>
      <ReactToPrint
        trigger={() => {
          return (
            <Fab color="secondary">
              <PrintIcon />
            </Fab>
          );
        }}
        content={() => printRef.current}
      />
      <Modal open={editing} onClose={handleClose}>
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
              <Stack
                direction="horizontal"
                sx={{ width: "100%", padding: "8px", paddingTop: "16px" }}
              >
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
                    <Button
                      variant="contained"
                      sx={{ marginRight: "8px" }}
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
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
                      />
                      <HeroSummaryEdit
                        summary={editingComp.tank2}
                        position="tank2"
                        type="tank"
                        setHero={heroHandler}
                        setPlayer={playerHandler}
                      />
                    </Stack>
                    <Stack sx={{ width: "33%", padding: "8px" }}>
                      <HeroSummaryEdit
                        summary={editingComp.dps1}
                        position="dps1"
                        type="dps"
                        setHero={heroHandler}
                        setPlayer={playerHandler}
                      />
                      <HeroSummaryEdit
                        summary={editingComp.dps2}
                        position="dps2"
                        type="dps"
                        setHero={heroHandler}
                        setPlayer={playerHandler}
                      />
                    </Stack>
                    <Stack sx={{ width: "33%", padding: "8px" }}>
                      <HeroSummaryEdit
                        summary={editingComp.heal1}
                        position="heal1"
                        type="heal"
                        setHero={heroHandler}
                        setPlayer={playerHandler}
                      />
                      <HeroSummaryEdit
                        summary={editingComp.heal2}
                        position="heal2"
                        type="heal"
                        setHero={heroHandler}
                        setPlayer={playerHandler}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          ) : null}
        </Paper>
      </Modal>
    </div>
  );
};

export default Compositions;
