// @flow
import React, { useState,useRef } from "react"
import ReactDOM from "react-dom"
import Editor, { examples } from "./Editor"
import Annotator from "../Annotator"
import ErrorBoundaryDialog from "./ErrorBoundaryDialog.js"

export default () => {
  const [annotatorOpen, changeAnnotatorOpen] = useState(false)
  // const [annotatorProps, changeAnnotatorProps] = useState(examples["Custom"]())
  const [annotatorProps, changeAnnotatorProps] = useState({
    taskDescription:
      "Annotate each image according to this _markdown_ specification.",
    // regionTagList: [],
    // regionClsList: ["hotdog"],
    regionTagList: ["has-bun"],
    regionClsList: ["hotdog", "not-hotdog"],
    allowComments: true,
  })
  const [images, setImages] = useState([
    {
      src: "https://images.unsplash.com/photo-1496905583330-eb54c7e5915a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      name: "hot-dogs-1",
      regions: [],
    },
    {
      src: "https://www.bianchi.com/wp-content/uploads/2019/07/YPB17I555K.jpg",
      name: "bianchi-oltre-xr4",
      regions: [],
    },
  ])
  const [lastOutput, changeLastOutput] = useState()
  const childRef = useRef();
  let _dispatch:any = null;

  return (
    <div>
      {annotatorOpen ? (
        <ErrorBoundaryDialog
          onClose={() => {
            changeAnnotatorOpen(false)
          }}
        >
          <>
            <button
              onClick={() => {
                console.log(_dispatch)
                _dispatch({
                  type: "ADD_REGION",
                  region: {
                    type: "box",
                    id: "20091109719847278",
                    color: "#ff0000",
                    cls: "test",
                    x: 0.22549019607843138,
                    y: 0.17509191176470587,
                    w: 0.2591911764705882,
                    h: 0.2892156862745098,
                    open: true,
                  },
                })
                // childRef.current.addRegion();
                // setImages(ps=>{
                //   ps[1].regions.push({
                //     type: "box",
                //     id: "20091109719847178",
                //     color: "#ff0000",
                //     cls: "test",
                //     x: 0.22549019607843138,
                //     y: 0.17509191176470587,
                //     w: 0.2591911764705882,
                //     h: 0.2892156862745098,
                //     open: true,
                //   })

                //   return [...ps]
                // })
               
              }}
            >
              add image
            </button>
            <Annotator
              hidePrev={false}
              hideNext={false}
              hideClone={true}
              hideSettings={true}
              labelImages={true}
              images={images}
              regionClsList={["POSITIVE_CLASS","NEGATIVE_CLASS", "EXTREME_POINT", "MEASUREMENT_CLASS"]}
              ref={childRef}
              onInit={(state, dispatch) => {
                console.log("dispatch",dispatch);
                _dispatch = dispatch;
              }}
              onDelete={(data) => {
                console.log("onDelete", data)
              }}
              onExit={(output) => {
                // delete (output: any)["lastAction"]
                console.log("onExit", output)
                // changeLastOutput(output)
                // changeAnnotatorOpen(false)
              }}
            />
          </>
        </ErrorBoundaryDialog>
      ) : (
        <Editor
          lastOutput={lastOutput}
          onOpenAnnotator={(props) => {
            changeAnnotatorProps(props)
            changeAnnotatorOpen(true)
          }}
        />
      )}
    </div>
  )
}
