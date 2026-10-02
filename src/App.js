import React, { useState } from "react";
import {
  ActionIcon,
  Button,
  Card,
  Container,
  Group,
  MantineProvider,
  Modal,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

import { useLocalStorage } from "@mantine/hooks";

import { MoonStars, Pencil, Sun, Trash } from "tabler-icons-react";

function App() {
  const [isModalOpen, setModalOpen] = useLocalStorage({
    key: "localModal",
    defaultValue: false,
  });
  const [isModalEditOpen, setModalEditOpen] = useLocalStorage({
    key: "localModalEdit",
    defaultValue: false,
  });

  const [isTheme, setTheme] = useLocalStorage({
    key: "localTheme",
    defaultValue: "light",
  });

  const [isInputOne, setInputOne] = useState("");
  const [isInputTwo, setInputTwo] = useState("");
  const [isInputId, setInputId] = useState("");

  const [isInputsValue, setInputsValue] = useLocalStorage({
    key: "isInputsValue",
    defaultValue: [],
  });

  let mirMir = isInputsValue;

  const addInputs = () => {
    if (isInputOne === "" && isInputTwo === "") {
      return;
    }
    if (typeof isInputId !== "string") {
      const itemId = mirMir.findIndex((el) => el.id === isInputId);
      mirMir[itemId] = {
        id: isInputId,
        title: isInputOne,
        summary: isInputTwo,
      };
      setInputsValue(mirMir);
      return;
    }
    const random = Math.floor(Math.random() * 10000) + 1;
    const item = {
      id: random,
      title: isInputOne,
      summary: isInputTwo,
    };
    mirMir.push(item);
    setInputsValue(mirMir);
  };

  const deleteToDo = (i) => {
    const item = mirMir.filter((el) => el.id !== i);
    setInputsValue(item);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalEditOpen(false);
    setInputOne("");
    setInputTwo("");
    setInputId("");
  };
  const openModal = () => {
    setModalOpen(true);
  };

  const changeTheme = () => {
    setTheme((e) => (e === "light" ? "dark" : "light"));
  };

  const changeToDo = (o) => {
    setModalEditOpen(true);
    setInputOne(o.title);
    setInputTwo(o.summary);
    setInputId(o.id);
  };

  return (
    <MantineProvider
      theme={{ colorScheme: isTheme, defaultRadius: "md" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <div className="App">
        <Modal
          opened={isModalOpen || isModalEditOpen}
          size="md"
          title={isModalEditOpen ? "Change Task" : "New Task"}
          withCloseButton={false}
          onClose={closeModal}
          centered
        >
          <TextInput
            onChange={(e) => setInputOne(e.target.value)}
            mt="md"
            placeholder="Task Title"
            label="Title"
            value={isInputOne}
          />
          <TextInput
            onChange={(e) => setInputTwo(e.target.value)}
            mt="md"
            placeholder="Task Summary"
            label="Summary"
            value={isInputTwo}
          />
          <Group mt="md" position="apart">
            <Button onClick={closeModal} variant="subtle">
              Cancel
            </Button>
            <Button
              onClick={() => {
                addInputs();
                closeModal();
              }}
            >
              {isModalEditOpen ? "Change task" : "Create task"}
            </Button>
          </Group>
        </Modal>
        <Container sx={{ background: "inherit" }} size={550} my={40}>
          <Group position="apart">
            <Title
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900,
              })}
            >
              My tasks
            </Title>
            <ActionIcon onClick={changeTheme} color="blue" size="lg">
              {isTheme === "light" ? (
                <MoonStars size={16} />
              ) : (
                <Sun size={16} />
              )}
            </ActionIcon>
          </Group>
          {isInputsValue.length > 0 ? (
            isInputsValue.map((el) => (
              <Card key={el.id} withBorder mt="sm">
                <Group position="apart">
                  <Text weight="bold">{el.title}</Text>
                  <Group>
                    <ActionIcon
                      onClick={() =>
                        changeToDo({
                          id: el.id,
                          title: el.title,
                          summary: el.summary,
                        })
                      }
                      color="blue"
                      variant="transparent"
                    >
                      <Pencil />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => deleteToDo(el.id)}
                      color="red"
                      variant="transparent"
                    >
                      <Trash />
                    </ActionIcon>
                  </Group>
                </Group>
                <Text>{el.summary}</Text>
              </Card>
            ))
          ) : (
            <Text sx={{ marginTop: "20px" }}>You have no tasks</Text>
          )}
          <Button onClick={openModal} sx={{ width: "100%", marginTop: "12px" }}>
            New Task
          </Button>
        </Container>
      </div>
    </MantineProvider>
  );
}

export default App;
