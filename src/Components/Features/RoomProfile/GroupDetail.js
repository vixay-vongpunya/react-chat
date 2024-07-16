import { styled } from "styled-components";
import { SlPencil } from "react-icons/sl";
import { IoImageOutline } from "react-icons/io5";
import { useState } from "react";
import { connect } from "react-redux";
import { Popup } from "semantic-ui-react";

import { server } from "./../../../Actions/Index";
import {
  updateGroupDetail,
  updateProfile,
  updateBackground,
} from "../../../Actions/Room-Action";
import ImageModal from "../ImageModal";
import Button from "./../../Common/Button";
import Textarea from "./../../Common/Textarea";
import Input from "./../../Common/Input";
const StyledList = styled.div`
  li:not(:nth-child(3)) {
    display: flex;
    cursor: pointer;
    padding: 5px;
    border-radius: var(--small-border-radius);
  }
  li:not(:first-child, :nth-child(3)):hover {
    background-color: var(--hover-text);
  }
  p {
    padding: 2px 0;
    padding-left: 8px;
  }

  .edit-box {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  }
`;
const DescriptionBox = styled.div`
  width: 100%;
`;
const BioActionBox = styled.div`
  display: ${(props) => (props.$editBio ? "flex" : "none")};
  justify-content: flex-end;
`;
const NameActionBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const NameContainer = styled.div`
  width: 100%;
  display: ${(props) => (props.$editName ? "flex" : "none")};
  flex-direction: column;
  padding: 5px;
`;
function GroupDetail({
  room,
  updateGroupDetail,
  updateProfile,
  updateBackground,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileSelected, setProfileSelected] = useState("");
  const [editBio, setEditBio] = useState(false);
  const [editName, setEditName] = useState(false);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  useState(() => {
    setBio(room.profile.bio);
    setName(room.name);
  }, []);
  const updateImage = (dataUrl) => {
    if (!dataUrl) {
      return;
    }
    console.log(dataUrl);
    const data = new FormData();
    try {
      if (profileSelected) {
        data.append("profile_image", dataUrl);
        updateProfile(room.id, data, dataUrl);
      } else {
        data.append("background_image", dataUrl);
        updateBackground(room.id, data, dataUrl);
      }
    } catch (error) {
      console.log(error);
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
              <p>description</p>
              <div className="edit-box">
                {/* not working */}

                <Textarea
                  value={bio}
                  readOnly={!editBio}
                  onDoubleClick={() => setEditBio((prev) => !prev)}
                  onChange={(event) => setBio(event.target.value)}
                />
              </div>
              <BioActionBox $editBio={editBio}>
                <Button
                  onClick={() => {
                    setBio(room.bio);
                    setEditBio(false);
                  }}
                  text="cancel"
                />
                <Button onClick={updateBio} text="update" primary />
              </BioActionBox>
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
              <NameActionBox>
                <Button
                  onClick={() => {
                    setName(room.name);
                    setEditName(false);
                  }}
                  text="cancel"
                />
                <Button onClick={updateName} text="update" primary />
              </NameActionBox>
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
  updateProfile,
  updateBackground,
})(GroupDetail);
