import styled, { keyframes } from "styled-components";
import useApiRequest from "../../api/useApiRequest";
import { useEffect, useState, useRef } from "react";
import YouTube from "react-youtube";
import Playlists from "./Playlists";
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from "react-icons/fa";
import turnTable from "../../assets/turnTable.png";

function Playlist() {
  const [playlistItems, setPlaylistItems] = useState([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);
  const intervalRef = useRef(null);
  const { apiRequest } = useApiRequest();

  const playNextAudio = () => {
    setCurrentAudioIndex((prevIndex) =>
      prevIndex < playlistItems.length - 1 ? prevIndex + 1 : 0
    );
  };

  const onPlayerEnd = () => {
    setTimeout(() => {
      playNextAudio();
    }, 1000);
  };
  const togglePlayPause = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
  };
  const onProgressBarClick = (e) => {
    if (playerRef.current) {
      const rect = e.target.getBoundingClientRect();
      const clickPosition = e.clientX - rect.left;
      const newProgress = (clickPosition / rect.width) * 100;
      const newTime = (playerRef.current.getDuration() * newProgress) / 100;
      playerRef.current.seekTo(newTime, true);
      setProgress(newProgress);
    }
  };
  const updateProgress = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const duration = playerRef.current.getDuration();
      setProgress((currentTime / duration) * 100);
    }
  };

  const fetchPlaylistItems = async () => {
    try {
      const data = await apiRequest({
        method: "GET",
        url: "https://www.googleapis.com/youtube/v3/playlistItems",
        params: {
          part: "snippet",
          playlistId: "PLgfxU3idNsAsIiEfqmcXLhis1vHGu5bTB",
          key: process.env.REACT_APP_YOUTUBE_API_KEY,
        },
      });
      setPlaylistItems(data.items);
      console.log(data);
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };
  useEffect(() => {
    fetchPlaylistItems();
  }, []);

  useEffect(() => {
    if (playerRef.current && isPlaying) {
      intervalRef.current = setInterval(updateProgress, 1000);
    } else if (!isPlaying) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentAudioIndex]);

  return (
    <Container>
      <PlaylistsWrapper>
        {playlistItems.map((item, index) => (
          <Playlists
            onClick={() => setCurrentAudioIndex(index)}
            imgSrc={item.snippet.thumbnails.default.url}
            key={index}
            title={item.snippet.title}
          />
        ))}
      </PlaylistsWrapper>

      {playlistItems.length > 0 && (
        <>
          <TurnTableWrapper>
            <img src={turnTable} />
            <p>{playlistItems[currentAudioIndex]?.snippet.title}</p>
            <span>NAMKIJOO</span>
          </TurnTableWrapper>
          <YouTubeWrapper>
            <YouTube
              videoId={
                playlistItems[currentAudioIndex].snippet.resourceId.videoId
              }
              opts={{
                width: "100%",
                height: "200px",
                playerVars: { autoplay: 1 },
              }}
              onReady={onPlayerReady}
              onEnd={onPlayerEnd}
            />
          </YouTubeWrapper>
        </>
      )}
      <ButtonWrapper>
        <Button onClick={playNextAudio}>
          <FaChevronLeft />
        </Button>
        <Button onClick={togglePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </Button>
        <Button onClick={playNextAudio}>
          <FaChevronRight />
        </Button>
      </ButtonWrapper>
      <ProgressBarWrapper onClick={onProgressBarClick}>
        <ProgressBar progress={progress} />
      </ProgressBarWrapper>
    </Container>
  );
}

const Container = styled.div`
  > p {
    color: aliceblue;
    font-weight: bold;
    font-size: 13px;
    padding: 10px;
  }
`;
const scrollText = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const TurnTableWrapper = styled.div`
  width: 80%;
  padding: 20px;
  overflow: hidden;
  margin: auto;
  text-align: center;
  > img {
    width: 250px;
    height: 250px;
    margin: 10px;
  }
  > p {
    white-space: nowrap;
    animation: ${scrollText} 10s linear infinite;
    max-width: 100%;
    font-weight: bold;
    font-size: 18px;
  }
  > span {
    font-size: 12px;
  }
`;

const PlaylistsWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  padding: 10px 0;
`;

const YouTubeWrapper = styled.div`
  padding-top: 20px;
  width: 80%;
  margin: 0 auto;
  display: none;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const StyledButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Icon = styled.div`
  font-size: 20px;
  margin: 0 30px 0 30px;
`;

const Button = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>
    <Icon>{children}</Icon>
  </StyledButton>
);

const ProgressBarWrapper = styled.div`
  width: 80%;
  margin: 20px auto;
  background-color: #e0e0e0;
  border-radius: 5px;
  height: 8px;
  position: relative;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  width: ${({ progress }) => `${progress}%`};
  background-color: #3b5998;
  height: 100%;
  transition: width 0.1s ease-in-out;
`;

export default Playlist;
