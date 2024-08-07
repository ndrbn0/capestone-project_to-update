import styled from "styled-components";
import PairingItem from "./PairingItem";
import NewCommentForm from "./NewCommentForm";
import { useState } from "react";
import EditPairingForm from "./EditPairingForm";

const PairingsList = ({
  pairings,
  toggleFavoritePairing,
  pairingsInfo,
  onRate,
  updatePairingRating,
  onDeletePairing,
  ingredients,
  handleAddComment,
  handleEditComment,
  handleDeleteComment,
  setShowCommentPopup,
  showCommentPopup,
  setCurrentPairingId,
  currentPairingId,
  handleEditPairing,
}) => {
  const [editCommentId, setEditCommentId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleCommentSubmitLocal = (comment) => {
    handleAddComment(currentPairingId, comment);
    setShowCommentPopup(false);
    setCurrentPairingId(null);
  };

  const handleEditCommentLocal = () => {
    handleEditComment(currentPairingId, editCommentId, commentText);
    setEditCommentId(null);
    setCommentText("");
  };

  const handleDeleteCommentLocal = (pairingId, commentId) => {
    handleDeleteComment(pairingId, commentId);
    if (comments.length === 1) {
      setShowCommentPopup(false);
      setCurrentPairingId(null);
    }
  };

  const comments =
    pairingsInfo.find((pairing) => pairing._id === currentPairingId)
      ?.comments ?? [];
  return (
    <>
      <Container>
        <StyledList>
          {pairings.map((pairing) => (
            <PairingItem
              key={pairing._id}
              pairing={pairing}
              ingredients={ingredients}
              onRate={onRate}
              updatePairingRating={updatePairingRating}
              toggleFavoritePairing={toggleFavoritePairing}
              isFavorite={
                pairingsInfo.find(
                  (pairingInfo) => pairingInfo._id === pairing._id
                )?.isFavorite
              }
              onDeletePairing={onDeletePairing}
              setShow={setShowCommentPopup}
              onCommentButtonClick={() => {
                setCurrentPairingId(
                  pairingsInfo.find(
                    (pairingInfo) => pairingInfo._id === pairing._id
                  )?._id
                );
              }}
              onEditButtonClick={() => {
                setCurrentPairingId(pairing._id);
                setShowEditPopup(true);
              }}
            />
          ))}
        </StyledList>
        {showCommentPopup && (
          <Overlay
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setShowCommentPopup(!showCommentPopup);
              }
            }}
          >
            <Popup>
              <NewCommentForm
                onSubmit={handleCommentSubmitLocal}
                onClose={() => setShowCommentPopup(false)}
              />
              <CommentsList>
                {comments.length > 0 &&
                  comments.map((comment) => (
                    <Comment key={comment._id}>
                      {editCommentId === comment._id ? (
                        <>
                          <TextArea
                            value={commentText}
                            onChange={(event) =>
                              setCommentText(event.target.value)
                            }
                          />
                          <SaveButton onClick={handleEditCommentLocal}>
                            Save
                          </SaveButton>
                        </>
                      ) : (
                        <>
                          <CommentText>{comment.text}</CommentText>
                          <EditButton
                            onClick={() => {
                              setEditCommentId(comment._id);
                              setCommentText(comment.text);
                            }}
                          >
                            Edit
                          </EditButton>
                          <DeleteButton
                            onClick={() =>
                              handleDeleteCommentLocal(
                                currentPairingId,
                                comment._id
                              )
                            }
                          >
                            Delete
                          </DeleteButton>
                        </>
                      )}
                    </Comment>
                  ))}
              </CommentsList>
            </Popup>
          </Overlay>
        )}
        {showEditPopup && (
          <Overlay
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setShowEditPopup(!showEditPopup);
              }
            }}
          >
            <Popup>
              <EditPairingForm
                ingredients={ingredients}
                defaultData={pairings.find(
                  (pairing) => pairing._id === currentPairingId
                )}
                onSubmit={(updatedPairing) => {
                  handleEditPairing(updatedPairing, currentPairingId);
                  setShowEditPopup(false);
                }}
              />
            </Popup>
          </Overlay>
        )}
      </Container>
    </>
  );
};

export default PairingsList;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative;
  align-self: stretch;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`;

const Container = styled.div`
  border-radius: var(--radius-md, 24px);
  display: flex;
  min-width: 220px;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  padding: 8px;
  gap: 5 0px;
  margin-bottom: 15%;
`;

const Overlay = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.section`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1001;
`;

const CommentsList = styled.ul`
  margin-top: 20px;
`;

const Comment = styled.li`
  background: #ffffff;
  padding: 12px;
  border-radius: 8px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CommentText = styled.p`
  margin: 0;
`;

const EditButton = styled.button`
  background: #fff;
  color: rgb(156, 156, 156);
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
`;

const SaveButton = styled.button`
  background: #ff7f50;
  color: #fff;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
  transition: background 0.3s;
  &:hover {
    background: #b05e3f;
  }
`;

const DeleteButton = styled.button`
  background: #fff;
  color: rgb(156, 156, 156);
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 10px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  font-size: 14px;
  resize: none;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;
