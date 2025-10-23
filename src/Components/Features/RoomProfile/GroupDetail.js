import { styled } from "styled-components";
import { SlPencil } from "react-icons/sl";
import { IoImageOutline } from "react-icons/io5";
import { useState } from "react";

import { connect } from "react-redux";
import {
  updateGroupDetail,
  updateGroupProfile,
  updateGroupBackground,
} from "../../../Actions/Group-Action";
import ImageModal from "../ImageModal";
import Button from "./../../Common/Button";
import Textarea from "./../../Common/Textarea";
import Input from "./../../Common/Input";
const StyledList = styled.div`
  padding: 0px 10px;
  height: 100%;
  ul {
    padding: 0px;
  }
  li:not(:nth-child(3)) {
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: var(--small-border-radius);
  }
  li:not(:first-child, :nth-child(3)):hover {
    background-color: var(--hover-text);
    cursor: pointer;
  }
  p {
    padding: 2px 0;
    padding-left: 8px;
    margin: 0px;
  }

  .edit-box {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  }
`;
const DescriptionBox = styled.div`
  width: 100%;
  span {
    font-size: var(--tiny-font);
    padding: 1px 2px;
    border: 1px solid black;
    border-radius: var(--small-border-radius);
    cursor: pointer;
  }
`;
const ActionContainer = styled.div`
  width: 100%;
  display: ${(props) => (props.$editBio ? "flex" : "none")};
  justify-content: flex-end;
`;
const NameContainer = styled.div`
  width: 100%;
  display: ${(props) => (props.$editName ? "flex" : "none")};
  flex-direction: column;
  padding: 5px;
`;
const EditNameContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const ActionBox = styled.div`
  display: flex;
  width: 90%;
  padding: 6px 0px;
  gap: 2px;
`;

function GroupDetail({
  room,
  updateGroupDetail,
  updateGroupProfile,
  updateGroupBackground,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileSelected, setProfileSelected] = useState("");
  const [editBio, setEditBio] = useState(false);
  const [editName, setEditName] = useState(false);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  useState(() => {
    if (room.profile) {
      setBio(room.profile.bio);
    }

    setName(room.name);
  }, [room]);
  const updateImage = (dataUrl) => {
    if (!dataUrl) {
      return;
    }
   
    const data = new FormData();
    try {
      if (profileSelected) {
        data.append("profile_image", dataUrl);
        updateGroupProfile(room.id, data, dataUrl);
      } else {
        data.append("background_image", dataUrl);
        updateGroupBackground(room.id, data, dataUrl);
      }
    } catch (error) {
   
    }
  };
  const updateBio = () => {
    const data = {
      bio: bio.trim(),
      name: room.name,
    };
    updateGroupDetail(room.id, data);
    setEditBio(false);
  };
  const updateName = () => {
    const data = {
      bio: room.profile.bio,
      name: name.trim(),
    };
    updateGroupDetail(room.id, data);
    setEditName(false);
  };
  return (
    <>
      <StyledList>
        <ul>
          <li>
            <DescriptionBox>
              <p>
                description{" "}
                <span onClick={() => setEditBio((prev) => !prev)}>edit</span>
              </p>
              <div className="edit-box">
                <Textarea
                  value={bio}
                  readOnly={!editBio}
                  onChange={(event) => setBio(event.target.value)}
                />
              </div>

              <ActionContainer $editBio={editBio}>
                <ActionBox>
                  <Button
                    onClick={() => {
                      setBio(room.bio);
                      setEditBio(false);
                    }}
                    text="cancel"
                  />
                  <Button onClick={updateBio} text="update" primary />
                </ActionBox>
              </ActionContainer>
            </DescriptionBox>
          </li>
          <li
            onClick={() => {
              setEditName((prev) => !prev);
            }}
          >
            <SlPencil size={20} />
            <p>group name</p>
          </li>
          <li>
            <NameContainer $editName={editName}>
              <div className="edit-box">
                <Input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
              <EditNameContainer>
                <ActionBox>
                  <Button
                    onClick={() => {
                      setName(room.name);
                      setEditName(false);
                    }}
                    text="cancel"
                  />
                  <Button onClick={updateName} text="update" primary />
                </ActionBox>
              </EditNameContainer>
            </NameContainer>
          </li>

          <li
            onClick={() => {
              setProfileSelected(true);
              setModalOpen(true);
            }}
          >
            <IoImageOutline size={20} />
            <p>profile image</p>
          </li>
          <li
            onClick={() => {
              setProfileSelected(false);
              setModalOpen(true);
            }}
          >
            <IoImageOutline size={20} />
            <p> background image</p>
          </li>
        </ul>
      </StyledList>
      {modalOpen && (
        <ImageModal
          closeModal={() => setModalOpen(false)}
          updateImage={updateImage}
        />
      )}
    </>
  );
}

export default connect(null, {
  updateGroupDetail,
  updateGroupProfile,
  updateGroupBackground,
})(GroupDetail);
