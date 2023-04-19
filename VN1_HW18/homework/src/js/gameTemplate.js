export const gameTemplate = () => {
    const template = `
    <header>
    <h1>Let's play!</h1>
  </header>
  <main>
    <div id="game-rules">
      <h2>Game Rules</h2>
      <ul>
        <li>Scissors beats a paper</li>
        <li>Paper beats rock</li>
        <li>Rock beats scissors.</li>
        <li>And we play up to three win</li>
      </ul>
    </div>
    <div id="playground">
      <div id="buttons" >
        <button id="rock" type="submit" name="option" value="rock" class="button">Rock</button>
        <button id="paper" type="submit" name="option" value="paper" class="button">Paper</button>
        <button id="scissors" type="submit" name="option" value="scissors" class="button">Scissors</button>
      </div>
      <div id="results" class="results"></div>
      <div id="final-result"></div>
      <div id="reset" class="reset"><a href="#">Reset</a></div>
    </div>
  </main>`
    return template;
}
