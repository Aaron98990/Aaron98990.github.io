import { useState, useEffect } from 'react';
import styles from './Ejection.module.css';

const Ejection = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    number: '',
    team: '',
    offense: '',
    offenseTowards: '',
    abusiveLanguage: '',
    side: '',
    area: '',
    period: '',
    overtime: '',
    time: '',
    timeType: '',
    firstYCOffense: '',
    firstYCUB: '',
    firstYCPeriod: '',
    firstYCOvertime: '',
    firstYCTime: '',
    firstYCTimeType: '',
    secondYCOffense: '',
    secondYCUB: ''
  });

  const [activeRuleset, setActiveRuleset] = useState('FIFA');
  const [showFields, setShowFields] = useState({
    number: false,
    offenseTowards: false,
    abusiveLanguage: false,
    side: false,
    area: false,
    overtime: false,
    time: false,
    subsequentCaution: false,
    firstYCOvertime: false,
    firstYCTime: false
  });

  // Rule data - all three rulesets
  const nfhsRC = [
    ["violent conduct", "Violent Conduct"],
    ["subsequent caution", "Subsequent Caution"],
    ["Serious Foul Play", "Serious Foul Play"],
    ["Spitting at Someone", "Spitting at Someone"],
    ["Biting at Someone", "Biting at Someone"],
    ["Using insulting, offensive or abusive language", "Offensive or abusive language (includes taunting)"],
    ["Using insulting, offensive or abusive gesture", "Offensive or abusive gesture (includes taunting)"],
    ["illegally entering the field where a fight or altercation is taking place", "Illegally entering the field where a fight or altercation is taking place"],
    ["denying an obvious goal-scoring opportunity (DOGSO) by deliberatly handling the ball & Penalty kick/Free Kick", "DOGSO by deliberately handling the ball & Penalty/Free Kick"],
    ["denying an obvious goal-scoring opportunity (DOGSO) by Foul Outside the Penalty Area & Free Kick", "DOGSO by Foul Outside the Penalty Area & Free Kick"],
    ["denying an obvious goal-scoring opportunity (DOGSO) by Foul Inside the Penalty Area & No Attempt to play the ball & Penalty Kick", "DOGSO by Foul Inside the Penalty Area & No Attempt to play the ball & Penalty Kick"]
  ];

  const nfhsYC = [
    ["Unsporting Conduct - ", "Unsporting Conduct"],
    ["Dissent by word of mouth", "Dissent by word of mouth"],
    ["Dissent by action", "Dissent by action"],
    ["encroachment during a restart", "encroachment during a restart"],
    ["Persistent Infringement", "Persistent Infringement"],
    ["incidental use of vulgar or profane language", "Incidental use of vulgar or profane language"],
    ["Illegally entering the field", "Illegally entering the field"],
    ["Illegally leaving the field", "Illegally leaving the field"],
    ["use of an electronic communication device with on-field players during play", "Illegal use of an electronic communication device"]
  ];

  const nfhsUB = [
    ["Reckless Play", "Reckless Play"],
    ["Unnecessary delay", "Unnecessary Delay"],
    ["Holding a shirt, shorts", "Holding a shirt, shorts"],
    ["Deliberatly handling the ball to interfere with or stop a promising attack", "Deliberately handling the ball to interfere with or stop a promising attack (SPA)"],
    ["Foul that interferes with or stops a promising attack", "Foul that interferes with or stops a promising attack (SPA)"],
    ["Coaching Outside the Team Area", "Coaching Outside the Team Area"],
    ["Deliberate Verbal Tactics", "Deliberate Verbal Tactics"],
    ["Faking an injury", "Faking an injury"],
    ["Simulating a foul", "Simulating a foul"],
    ["Illegally equipped player (first instance for team)", "Illegally equipped player (first instance for team)"],
    ["A excessive or prolonged act to focus attention upon oneself", "A excessive or prolonged act to focus attention upon oneself"],
    ["DOGSO by deliberatly handling the ball & Advantage & Goal", "DOGSO by deliberately handling the ball & Advantage & Goal"],
    ["DOGSO by Foul & Advantage & Goal", "DOGSO by Foul & Advantage & Goal"],
    ["DOGSO by Foul in Penalty Area & Attempt to play the ball & Penalty Kick", "DOGSO by Foul in Penalty Area & Attempt to play the ball & Penalty Kick"],
    ["Use of alcohol, use of tobacco, to be under the influence", "Use of alcohol, use of tobacco, to be under the influence"]
  ];

  const fifaRC = [
    ["denying the opposing team a goal or an obvious goal-scoring opportunity by committing a deliberate handball offence (except a goalkeeper within their penalty area)", "DOG or DOGSO by committing a deliberate handball offence (except a goalkeeper within their penalty area)"],
    ["denying the opposing team a goal or an obvious goal-scoring opportunity by committing a non-deliberate handball offence outside their own penalty area", "DOG or DOGSO by committing a non-deliberate handball offence outside their own penalty area"],
    ["denying a goal or an obvious goal-scoring opportunity to an opponent whose overall movement is towards the offender's goal by an offence punishable by a free kick", "DOG or DOGSO to an opponent whose overall movement is towards the offender's goal by an offence punishable by a free kick"],
    ["serious foul play", "serious foul play"],
    ["biting at someone", "biting at someone"],
    ["spitting at someone", "spitting at someone"],
    ["violent conduct", "violent conduct"],
    ["offensive, insulting or abusive language", "offensive, insulting or abusive language"],
    ["offensive, insulting or abusive action(s)", "offensive, insulting or abusive action(s)"],
    ["receiving a second caution in the same match", "second caution in the same match"],
    ["entering the video operation room (VOR)", "entering the video operation room (VOR)"]
  ];

  const fifaYC = [
    ["delaying the restart of play", "delaying the restart of play"],
    ["dissent by word", "dissent by word"],
    ["dissent by action", "dissent by action"],
    ["entering the field of play without the referee's permission", "entering the field of play without the referee's permission"],
    ["re-entering the field of play without the referee's permission", "re-entering the field of play without the referee's permission"],
    ["deliberately leaving the field of play without the referee's permission", "deliberately leaving the field of play without the referee's permission"],
    ["failing to respect the required distance when play is restarted with a dropped ball", "failing to respect the required distance when play is restarted with a dropped ball"],
    ["failing to respect the required distance when play is restarted with a corner kick", "failing to respect the required distance when play is restarted with a corner kick"],
    ["failing to respect the required distance when play is restarted with a free kick", "failing to respect the required distance when play is restarted with a free kick"],
    ["failing to respect the required distance when play is restarted with a throw-in", "failing to respect the required distance when play is restarted with a throw-in"],
    ["persistent offences", "persistent offences"],
    ["unsporting behaviour - ", "unsporting behaviour"],
    ["entering the referee review area (RRA)", "entering the referee review area (RRA)"],
    ["excessively using the 'review' (TV screen) signal", "excessively using the 'review' (TV screen) signal"]
  ];

  const fifaUB = [
    ["attempts to deceive the referee, e.g. by feigning injury or pretending to have been fouled (simulation)", "attempts to deceive the referee, e.g. by feigning injury or pretending to have been fouled (simulation)"],
    ["changes places with the goalkeeper during play or without the referee's permission (both are cautioned)", "changes places with the goalkeeper during play or without the referee's permission (both are cautioned)"],
    ["commits in a reckless manner a direct free kick offence", "commits in a reckless manner a direct free kick offence"],
    ["handles the ball to interfere with or stop a promising attack, except where the referee awards a penalty kick for a non-deliberate handball offence", "handles the ball to interfere with or SPA, except where the referee awards a penalty kick for a non-deliberate handball offence"],
    ["denies the opposing team a goal or an obvious goal-scoring opportunity and the referee awards a penalty kick for a non-deliberate handball offence", "DOG or DOGSO and the referee awards a penalty kick for a non-deliberate handball offence"],
    ["commits any other offence which interferes with or stops a promising attack, except where the referee awards a penalty kick for an offence which was an attempt to play the ball or a challenge for the ball", "interferes with or SPA, except where the referee awards a penalty kick for an offence which was an attempt to play or challenge the ball"],
    ["denies an opponent an obvious goal-scoring opportunity by committing an offence which was an attempt to play the ball or a challenge for the ball and the referee awards a penalty kick", "DOG or DOGSO y by committing an offence which was an attempt to play the ball or a challenge for the ball and the referee awards a penalty kick"],
    ["handles the ball in an attempt to score a goal (whether or not the attempt is successful) or in an unsuccessful attempt to prevent a goal", "handles the ball in an attempt to score a goal (whether or not the attempt is successful) or in an unsuccessful attempt to prevent a goal"],
    ["makes unauthorised marks on the field of play", "makes unauthorised marks on the field of play"],
    ["plays the ball when leaving the field of play after being given permission to leave", "plays the ball when leaving the field of play after being given permission to leave"],
    ["shows a lack of respect for the game", "shows a lack of respect for the game"],
    ["initiates a deliberate trick for the ball to be passed to the goalkeeper with the head, chest, knee etc. to circumvent the Law", "initiates a deliberate trick for the ball to be passed to the goalkeeper with the head, chest, knee etc. to circumvent the Law"],
    ["verbally distracts an opponent during play or at a restart", "verbally distracts an opponent during play or at a restart"],
    ["celebrates a goal by climbing onto a perimeter fence", "celebrates a goal by climbing onto a perimeter fence"],
    ["celebrates a goal approaching the spectators a manner which causes safety or security issues", "celebrates a goal approaching the spectators a manner which causes safety and/or security issues"],
    ["celebrates a goal by acting in a provocative, derisory or inflammatory way", "celebrates a goal by acting in a provocative, derisory or inflammatory way"],
    ["celebrates a goal by covering the head or face with a mask or other similar item", "celebrates a goal by covering the head or face with a mask or other similar item"],
    ["celebrates a goal by removing the shirt or covering the head with the shirt", "celebrates of a goal by removing the shirt or covering the head with the shirt"],
    ["the kicker of the penalty kick feints to kick the ball once they have completed the run-up", "the kicker of the penalty kick feints to kick the ball once they have completed the run-up"],
    ["a team-mate of the identified kicker of the penalty kick takes the kick (the player who took the kick is cautioned)", "a team-mate of the identified kicker of the penalty kick takes the kick (the player who took the kick is cautioned)"],
    ["the goalkeeper's offence results in the penalty kick being retaken for the second or more time", "the goalkeeper's offence results in the penalty kick being retaken for the second or more time"],
    ["during a penalty kick both the goalkeeper and the kicker commit an offence at the same time (the kicker is cautioned)", "during a penalty kick both the goalkeeper and the kicker commit an offence at the same time (the kicker is cautioned)"],
    ["refuses to leave the field of play when unable or unwilling to remove the unauthorised/dangerous equipment or jewellery", "refuses to leave the field of play when unable or unwilling to remove the unauthorised/dangerous equipment or jewellery"],
    ["wears unauthorised/dangerous equipment or jewellery again after being told to remove the item", "wears unauthorised/dangerous equipment or jewellery again after being told to remove the item"],
    ["refuses to leave the field of play after the referee authorised doctors or stretcher bearers to enter the field of play", "refuses to leave the field of play after the referee authorised doctors or stretcher bearers to enter the field of play"]
  ];

  // Get terminology based on ruleset
  const getTerminology = () => {
    switch (activeRuleset) {
      case 'NFHS':
        return {
          ejected: 'ejected',
          match: 'game',
          overtime: 'overtime period',
          infringement: 'infringement',
          official: 'match official'
        };
      case 'NCAA':
        return {
          ejected: 'ejected',
          match: 'game',
          overtime: 'overtime period',
          infringement: 'infringement',
          official: 'bench personel'
        };
      default: // FIFA
        return {
          ejected: 'sent-off',
          match: 'match',
          overtime: 'half of extra time',
          infringement: 'offense',
          official: 'team official'
        };
    }
  };

  const getCurrentRules = () => {
    switch (activeRuleset) {
      case 'NFHS':
        return { RC: nfhsRC, YC: nfhsYC, UB: nfhsUB };
      case 'NCAA':
        return { RC: nfhsRC, YC: nfhsYC, UB: nfhsUB }; // NCAA would have its own rules
      default:
        return { RC: fifaRC, YC: fifaYC, UB: fifaUB };
    }
  };

  const handleRulesetChange = (ruleset) => {
    setActiveRuleset(ruleset);
    // Reset offense-related fields when changing ruleset
    setFormData(prev => ({
      ...prev,
      offense: '',
      firstYCOffense: '',
      secondYCOffense: ''
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update field visibility based on changes
    updateFieldVisibility(name, value);
  };

  const updateFieldVisibility = (fieldName, value) => {
    const newShowFields = { ...showFields };

    // Show number field for players and substitutes
    if (fieldName === 'role') {
      newShowFields.number = value.toLowerCase().includes('player') || value.toLowerCase().includes('substitute');
    }

    // Show offense details based on offense type
    if (fieldName === 'offense') {
      const needsTowards = !value.toLowerCase().includes('violent') && 
                          !value.toLowerCase().includes('assaulting') && 
                          !value.toLowerCase().includes('fighting') && 
                          !value.toLowerCase().includes('spitting') && 
                          !value.toLowerCase().includes('biting');
      
      newShowFields.offenseTowards = needsTowards && value !== '';
      newShowFields.abusiveLanguage = value.toLowerCase().includes('language');
      
      const needsSide = value.toLowerCase().includes('violent') || 
                       value.toLowerCase().includes('assaulting') || 
                       value.toLowerCase().includes('fighting') || 
                       value.toLowerCase().includes('spitting') || 
                       value.toLowerCase().includes('biting');
      
      newShowFields.side = needsSide;
      
      const isSubsequent = value.toLowerCase().includes('subsequent') || value.toLowerCase().includes('second caution');
      newShowFields.subsequentCaution = isSubsequent;
    }

    // Show area field based on side selection
    if (fieldName === 'side') {
      newShowFields.area = value === 'in the offender\'s defending half of the field' || 
                          value === 'in the offender\'s attacking half of the field';
    }

    // Show overtime field
    if (fieldName === 'period') {
      newShowFields.overtime = value === ' ';
      newShowFields.time = false; // Hide time until period/overtime is properly selected
    }

    if (fieldName === 'overtime') {
      newShowFields.time = value !== '';
    }

    // First YC overtime handling
    if (fieldName === 'firstYCPeriod') {
      newShowFields.firstYCOvertime = value === ' ';
      newShowFields.firstYCTime = false;
    }

    if (fieldName === 'firstYCOvertime') {
      newShowFields.firstYCTime = value !== '';
    }

    // Show time fields for specific periods
    if ((fieldName === 'period' || fieldName === 'overtime') && 
        (value === 'first half' || value === 'second half' || 
         formData.overtime === 'first overtime period' || formData.overtime === 'second overtime period')) {
      newShowFields.time = true;
    }

    if ((fieldName === 'firstYCPeriod' || fieldName === 'firstYCOvertime') && 
        (value === 'first half' || value === 'second half' || 
         formData.firstYCOvertime === 'first overtime period' || formData.firstYCOvertime === 'second overtime period')) {
      newShowFields.firstYCTime = true;
    }

    setShowFields(newShowFields);
  };

  const isFormValid = () => {
    const required = ['name', 'role', 'team', 'offense'];
    
    // Add conditional required fields
    if (showFields.number && formData.role !== 'Coach') required.push('number');
    if (showFields.offenseTowards) required.push('offenseTowards');
    if (showFields.abusiveLanguage) required.push('abusiveLanguage');
    if (showFields.side) required.push('side');
    if (showFields.area) required.push('area');
    if (showFields.subsequentCaution) {
      required.push('firstYCOffense', 'firstYCPeriod', 'secondYCOffense');
    }

    return required.every(field => formData[field] && formData[field].trim() !== '');
  };

  const generateReport = () => {
    const terminology = getTerminology();
    
    let report = `${formData.name} (${formData.role}`;
    
    if (formData.number && formData.role !== 'Coach') {
      report += `#${formData.number}`;
    }
    
    report += ` - ${formData.team}) was shown the red card and ${terminology.ejected} for "${formData.offense}"`;
    
    if (formData.abusiveLanguage) {
      report += ` The exact language was: "${formData.abusiveLanguage}"`;
    }
    
    if (formData.offenseTowards) {
      report += ` ${formData.offenseTowards}`;
    }
    
    report += ` The ${terminology.infringement} occurred`;
    
    if (formData.side) {
      report += ` ${formData.side}`;
    }
    
    if (formData.area) {
      report += ` ${formData.area}`;
    }
    
    if (formData.time && formData.timeType) {
      report += ` ${formData.time} ${formData.timeType}`;
    }
    
    if (formData.period) {
      report += ` ${formData.period === ' ' ? '' : formData.period}`;
    }
    
    if (formData.overtime) {
      report += ` ${formData.overtime}`;
    }
    
    report += `. There was no further incident with the ${terminology.ejected} participant.`;
    
    // Add subsequent caution details
    if (showFields.subsequentCaution) {
      report += `\n\nThe first yellow card was shown for "${formData.firstYCOffense}"`;
      
      if (formData.firstYCUB) {
        report += `${formData.firstYCUB}`;
      }
      
      if (formData.firstYCTime && formData.firstYCTimeType) {
        report += ` ${formData.firstYCTime} ${formData.firstYCTimeType}`;
      }
      
      if (formData.firstYCPeriod) {
        report += ` ${formData.firstYCPeriod === ' ' ? '' : formData.firstYCPeriod}`;
      }
      
      if (formData.firstYCOvertime) {
        report += ` ${formData.firstYCOvertime}`;
      }
      
      report += `. The second yellow card was shown for "${formData.secondYCOffense}"`;
      
      if (formData.secondYCUB) {
        report += `${formData.secondYCUB}`;
      }
      
      report += `.`;
    }
    
    return report;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateReport());
      alert('Report copied to clipboard!');
    } catch (err) {
      alert('Failed to copy to clipboard. Please select and copy the text manually.');
    }
  };
    
    if (showOffenseTowards && formData.offenseTowards) {
      report += `Offense Towards: ${formData.offenseTowards}\n`;
    }
    
    if (showAbusiveLanguage && formData.abusiveLanguage) {
      report += `Abusive Language: ${formData.abusiveLanguage}\n`;
    }

    if (formData.offense === 'second caution in the same match') {
      report += `\nFirst Yellow Card: ${formData.firstYCOffense}\n`;
      if (showFirstYCDetails && formData.firstYCUB) {
        report += `First YC Details: ${formData.firstYCUB}\n`;
      }
      report += `Second Yellow Card: ${formData.secondYCOffense}\n`;
      if (showSecondYCDetails && formData.secondYCUB) {
        report += `Second YC Details: ${formData.secondYCUB}\n`;
      }
    }

    navigator.clipboard.writeText(report).then(() => {
      alert('Report copied to clipboard!');
    });
  };

  return (
    <div className={styles.container}>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Red Card Report</h1>
        <p className="text-center text-muted">
          Customized for college (NCAA), high school (NFHS), and worldwide (IFAB+FIFA) soccer rules.
        </p>

        <form className={styles.form}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="role" className="form-label">Role:</label>
              <select
                className="form-select"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="">Select Role</option>
                <option value="Player">Player</option>
                <option value="Substitute">Substitute</option>
                <option value="Coach">Coach</option>
                <option value="Assistant Coach">Assistant Coach</option>
                <option value="Team Official">Team Official</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="number" className="form-label">Number:</label>
              <input
                type="number"
                className="form-control"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="team" className="form-label">Team:</label>
              <input
                type="text"
                className="form-control"
                id="team"
                name="team"
                value={formData.team}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="gameRuleset" className="form-label">Game Ruleset:</label>
            <select
              className="form-select"
              id="gameRuleset"
              name="gameRuleset"
              value={formData.gameRuleset}
              onChange={handleInputChange}
            >
              <option value="FIFA/IFAB">FIFA/IFAB (Laws of the Game)</option>
              <option value="NFHS">NFHS (High School)</option>
              <option value="NCAA">NCAA (College)</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="offense" className="form-label">Offense:</label>
            <select
              className="form-select"
              id="offense"
              name="offense"
              value={formData.offense}
              onChange={handleInputChange}
            >
              <option value="">Select Offense</option>
              {getCurrentRules().map(([value, display]) => (
                <option key={value} value={value}>{display}</option>
              ))}
            </select>
          </div>

          {showOffenseTowards && (
            <div className="mb-3">
              <label htmlFor="offenseTowards" className="form-label">Offense Towards:</label>
              <input
                type="text"
                className="form-control"
                id="offenseTowards"
                name="offenseTowards"
                value={formData.offenseTowards}
                onChange={handleInputChange}
                placeholder="e.g., opponent, referee, spectator"
              />
            </div>
          )}

          {showAbusiveLanguage && (
            <div className="mb-3">
              <label htmlFor="abusiveLanguage" className="form-label">Abusive Language:</label>
              <textarea
                className="form-control"
                id="abusiveLanguage"
                name="abusiveLanguage"
                rows="3"
                value={formData.abusiveLanguage}
                onChange={handleInputChange}
                placeholder="Details of abusive language used"
              />
            </div>
          )}

          {formData.offense === 'second caution in the same match' && (
            <div className="border p-3 mb-3">
              <h5>Yellow Card Details</h5>
              
              <div className="mb-3">
                <label htmlFor="firstYCOffense" className="form-label">First Yellow Card Offense:</label>
                <select
                  className="form-select"
                  id="firstYCOffense"
                  name="firstYCOffense"
                  value={formData.firstYCOffense}
                  onChange={handleInputChange}
                >
                  <option value="">Select First YC Offense</option>
                  <option value="unsporting behaviour">Unsporting Behaviour</option>
                  <option value="dissent by word">Dissent by Word</option>
                  <option value="dissent by action">Dissent by Action</option>
                  <option value="persistent offences">Persistent Offences</option>
                  <option value="delaying the restart of play">Delaying the Restart of Play</option>
                </select>
              </div>

              {showFirstYCDetails && (
                <div className="mb-3">
                  <label htmlFor="firstYCUB" className="form-label">First YC Details:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstYCUB"
                    name="firstYCUB"
                    value={formData.firstYCUB}
                    onChange={handleInputChange}
                  />
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="secondYCOffense" className="form-label">Second Yellow Card Offense:</label>
                <select
                  className="form-select"
                  id="secondYCOffense"
                  name="secondYCOffense"
                  value={formData.secondYCOffense}
                  onChange={handleInputChange}
                >
                  <option value="">Select Second YC Offense</option>
                  <option value="unsporting behaviour">Unsporting Behaviour</option>
                  <option value="dissent by word">Dissent by Word</option>
                  <option value="dissent by action">Dissent by Action</option>
                  <option value="persistent offences">Persistent Offences</option>
                  <option value="delaying the restart of play">Delaying the Restart of Play</option>
                </select>
              </div>

              {showSecondYCDetails && (
                <div className="mb-3">
                  <label htmlFor="secondYCUB" className="form-label">Second YC Details:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="secondYCUB"
                    name="secondYCUB"
                    value={formData.secondYCUB}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </div>
          )}

          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={generateReport}
              disabled={!formData.name || !formData.offense}
            >
              Generate Report
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <small className="text-muted">
            This tool generates a standardized ejection report based on the selected rule set.
            The report will be copied to your clipboard when generated.
          </small>
        </div>
      </div>
    </div>
  );
};

export default Ejection;