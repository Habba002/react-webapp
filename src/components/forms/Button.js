import loadingGif from '../../images/loading.gif'

export default function Button({handleSubmit, loading}) {
  return (
    <button onClick={handleSubmit} type="submit" className="btn btn-primary">
      {loading ? <img src={loadingGif} alt="Loading" style={{height: "20px"}}/> : "Submit" }
    </button>
  )
}