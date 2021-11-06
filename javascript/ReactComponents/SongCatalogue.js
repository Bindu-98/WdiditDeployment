function SongCataloguePage() {

  const [tracks, setTracks] = React.useState([]);
  const [searchKeyword, setSearchKeyword] = React.useState("");

  const [helperText, setHelperText] = React.useState("Loading Please Wait...");

  const [songLimit , setSongLimit ]  = React.useState(100)

  React.useEffect(() => {
    //console.log(members[19])
  }, [tracks.length]);

  const handleSearch = () => {
      try {
        let tracks = localStorage.getItem("tracks") 

        tracks = JSON.parse(tracks)

        let filtered_tracks = tracks.filter((track) =>
                     track.Member1.toLowerCase().includes(searchKeyword.toLowerCase()) 
                  || track.Song_Name.toLowerCase().includes(searchKeyword.toLowerCase())
                  || track.Member2.toLowerCase().includes(searchKeyword.toLowerCase())
            );
        if(filtered_tracks.length <= 0 )
        {
          setHelperText("Results Could Not be Found, please try another keyword")
        }
        setTracks(filtered_tracks)
      } catch (error) {
        console.log(error)
      }
  }

  React.useEffect(() => {
    console.log(songLimit)
  }, [songLimit])

  const handleLoadMore = () => {
    setSongLimit(songLimit + 100)
  }

  React.useEffect( () => {

    //console.log(members[19])

    // fetch("/javascript/ReactComponents/tracks.json")
    //   .then(function (response) {
    //     return response;
    //   })
    //   .then(function (data) {
    //     return data.json();
    //   })
    //   .then(function (data) {
        

    //     let filtered_tracks = data.filter((track) =>
    //       track.Song_Name.toLowerCase().includes(searchKeyword.toLowerCase())
    //     );

    //     setTracks(filtered_tracks);
    //   })
    //   .catch((err) => console.log(err));

    
    if(searchKeyword === ""){

      try {
        let data =  localStorage.getItem("tracks")
        data = JSON.parse(data)
  
        const slicedArray = data.slice(0,50)
        setTracks(slicedArray);
  
      } catch (error) {
        console.log(error)
      }
  
    }

  }, [searchKeyword]);

  React.useEffect(() => {

    console.log("Member Catalogue Use Effect Running");

    fetch("javascript/ReactComponents/tracks.json")
      .then(function (response) {
        return response;
      })
      .then(function (data) {
        return data.json();
      })
      .then(function (data) {
        //console.log(data)
        
        try {
        
          const slicedArray = data.slice(0,songLimit)
          setTracks(slicedArray);
          localStorage.setItem("tracks", JSON.stringify(data))
        
        } catch (error) {
          console.log(error)
        }

        //document.getElementById("app").innerHTML = html;
      })
      .catch((err) => console.log(err));
  }, [songLimit]);

  let songCardContainerStyles = {
    color : "white",
    display : "grid",
    gridTemplateColumns: "auto auto auto auto",
    gridRowGap : "5vh",
    gridColumnGap : "5vw",
    width : "100%"
  }

  let trackComponents = tracks.map((track) => (
    <TrackCard
      key={track.WDG_ID}
      song_name ={track.Song_Name}
      member_1 = {track.Member1}
      member_2 = {track.Member2}
      wdg_id = {track.WDG_ID}
      contributer_1 = {track.OC1}
      contributer_2 = {track.OC2}
      contributer_3 = {track.OC3}
      contributer_4 = {track.OC4}
      percentage = {track.Presentage}
    />
  ));

  return (
    <div>
      <div id="searchWrapper">
        <div class="flex">
          <input
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder="Search for an artist or a song"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
            }}
          />
          <button 
              type="submit"
              onClick = { () => handleSearch()}  
          >
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div
        className = "songCardContainer"
        //style = {songCardContainerStyles}
      >
       {
          (trackComponents.length >= 1) ? trackComponents : <div>{helperText}</div> 
        }
      </div>
      <button 
        className = "loadMoreButton"
        onClick = { () => { handleLoadMore() }}
      > 
          Load More
      </button>
    </div>
  );
}


function TrackCard({ 
    song_name , 
    member_1, 
    member_2 , 
    contributer_1,
    contributer_2,
    contributer_3,
    contributer_4,
    percentage ,
    wdg_id 
  }) {


    let imageSrc = "javascript/ReactComponents/hundred_percent_icon.svg"

    switch (percentage) {
      case "25%":
        imageSrc = "javascript/ReactComponents/twentyFive_percent_icon.svg"
        break;
      case "50%":
        imageSrc = "javascript/ReactComponents/fifty_percent_icon.svg"
        break;
      case "75%":
        imageSrc = "javascript/ReactComponents/seventyFive_percent_icon.svg"
        break;
      case "100%":
        imageSrc = "javascript/ReactComponents/hundred_percent_icon.svg"
        break;
      default:
        imageSrc = "javascript/ReactComponents/hundred_percent_icon.svg"
        break;
    }

  return (
    <div className="songCard">
        <div className="songCard__content">
              <div className="songCard__titleSection">
                <h5 className="songCard__wdig_text">{wdg_id}</h5>
                <h5 className="songCard__songName_text">{song_name}</h5>   
              </div>
              <div className="songCard__memberSection">
                <h5 className="songCard__wdig_text--grey">Members</h5>
                { (member_1 !== "") ? <h5 className="songCard__memberName_text">{member_1}</h5> : <></>  }
                { (member_2 !== "") ? <h5 className="songCard__memberName_text">{member_2}</h5> : <></>  }    
              </div>
              <div className="songCard__contributerSection">
                <h5 className="songCard__wdig_text--grey">Contributions</h5>
                { (contributer_1 !== "") ? <h5 className="songCard__contributer_text" >{contributer_1}</h5> : <></>  }
                { (contributer_2 !== "") ? <h5 className="songCard__contributer_text">{contributer_2}</h5> : <></>  }
                { (contributer_3 !== "") ? <h5 className="songCard__contributer_text">{contributer_3}</h5> : <></>  }
                { (contributer_4 !== "") ? <h5 className="songCard__contributer_text">{contributer_4}</h5> : <></>  }
              </div>
        </div>
       <div className="songCard__icon">
          <img src = {imageSrc} className="songCard__icon__image"/>  
            <h5 className="songCard__wdig_text">{`${percentage} Copyright`}</h5>   
       </div>
           
      <br />

      <br />
    </div>
  );
}
