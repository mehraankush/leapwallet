"use client"
import Image from "next/image";
import { useState } from "react";

type movies = {
  title: string;
  img: string;
}


export default function Home() {
  const [addMovie, setaddMovie] = useState(false);
  const [addnewMovie, setaddnewMovie] = useState<movies[]>([
    {
      title: 'add movies ',
      img: '',
    }
  ])

  let title = ''
  let img = ''
  const addMovies = (e) => {
    if (e.target.name == 'title') {
      title = e.target.value
    }
    if (e.target.name == 'img') {
      img = e.target.value
    }
  }

  const handlesubmit = () => {
    addnewMovie.push({ title, img })
    setaddnewMovie([...addnewMovie])
    setaddMovie(false)
  }

  const handleselect = (e) =>{
    e.preventDefault();
    const filteredMovie = addnewMovie.filter((movie)=> movie.title === e.target.value)
    setaddnewMovie(filteredMovie)
    console.log(filteredMovie,"filtermovie")
  }

  return (
    <div className="flex flex-col justify-center items-center bg-black h-screen w-svreen">
      {
        addMovie ? (
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div>
                <input type="select" className="bg-transparent p-2 border border-white rounded" placeholder="select" />
              </div>

              <div className="cursor-pointer p-2 border border-white rounded" onClick={() => setaddMovie(!addMovie)}>
                <p>Add a new Movie</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex gap-4 justify-center items-center">
                <p>Name:</p>
                <input type="text" className="bg-transparent p-2 border border-white" placeholder="Enter movie name" onChange={addMovies} name="title" />
              </div>
              <div className="flex gap-4 justify-center items-center">
                <p>Poster Image:</p>
                <input type="text" className="bg-transparent p-2 border border-white rounded" placeholder="Poster Link" onChange={addMovies} name="img" />
              </div>

              <div >
                <button className="bg-gray-900 w-full p-2 rounded" onClick={handlesubmit}>Add</button>
              </div>
            </div>
          </div>
        ) :
          (
            <>
              <div className="flex gap-5">
                <select name="movie" id="movie" className="bg-black" onClick={handleselect}>
                  {
                    addnewMovie.map((movie, i) => (
                      <option value={movie.title} key={i} >
                        <p >{movie.title}</p>
                      </option>
                    ))
                  }
                </select> 

                <div className="cursor-pointer p-2 border border-white rounded" onClick={() => setaddMovie(!addMovie)}>
                  <p>Add a new Movie</p>
                </div>

              </div>

              <div className="h-1/2 overflow-y-scroll">
                {
                  addnewMovie.length > 0 && addnewMovie.map((movie, i) => (
                    <div key={i} className="flex justify-center items-center flex-col mt-10">
                      <p className="text-3xl font-bold">{movie.title}</p>
                      <Image src={movie.img} alt="movie" width={100} height={100} className="h-[15rem] w-[12rem]" />
                    </div>
                  ))
                }
              </div>


            </>
          )
      }

    </div>
  );
}
