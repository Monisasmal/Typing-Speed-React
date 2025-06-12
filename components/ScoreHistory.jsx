const ScoreHistory = ({ score }) => (
  <div className="history-box">
    <h3>Score History</h3>
    {score.length === 0 ? (
      <p>No previous scores found.</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Level</th>
            <th>WPM</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          {score.map((score, idx) => (
            <tr key={idx}>
              <td>{new Date(score.time).toLocaleString()}</td>
              <td>{score.level}</td>
              <td>{score.wpm}</td>
              <td>{score.accuracy}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default ScoreHistory;