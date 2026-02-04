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
    firstYCPeriod: '',
    firstYCOvertime: '',
    firstYCTime: '',
    firstYCTimeType: '',
    secondYCOffense: ''
  });

  const [activeRuleset, setActiveRuleset] = useState('NFHS');
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

  // Rule data
  const rules = {
    NFHS: {
      RC: [
        ['serious foul play', 'serious foul play'],
        ['violent conduct', 'violent conduct'],
        ['spitting at an opponent or any other person', 'spitting at an opponent or any other person'],
        ['denying the opposing team a goal or an obvious goal-scoring opportunity by deliberately handling the ball (this does not apply to a goalkeeper within their penalty area)', 'denying the opposing team a goal or an obvious goal-scoring opportunity by deliberately handling the ball'],
        ['denying an obvious goal-scoring opportunity to an opponent moving towards the player\'s goal by an offense punishable by a free kick or a penalty kick', 'denying an obvious goal-scoring opportunity to an opponent moving towards the player\'s goal by an offense punishable by a free kick or a penalty kick'],
        ['using offensive, insulting or abusive language and/or gestures', 'using offensive, insulting or abusive language and/or gestures'],
        ['receiving a second caution in the same match', 'receiving a second caution in the same match']
      ],
      YC: [
        ['unsporting behavior', 'unsporting behavior'],
        ['dissent by word or action', 'dissent by word or action'],
        ['persistent infringement of the Laws of the Game', 'persistent infringement of the Laws of the Game'],
        ['delaying the restart of play', 'delaying the restart of play'],
        ['failure to respect the required distance when play is restarted with a corner kick, free kick, or throw-in', 'failure to respect the required distance'],
        ['entering or re-entering the field of play without the referee\'s permission', 'entering or re-entering the field of play without permission'],
        ['deliberately leaving the field of play without the referee\'s permission', 'deliberately leaving the field of play without permission']
      ]
    },
    NCAA: {
      RC: [
        ['serious foul play', 'serious foul play'],
        ['violent conduct', 'violent conduct'],
        ['spitting at an opponent or any other person', 'spitting at an opponent or any other person'],
        ['denying the opposing team a goal or an obvious goal-scoring opportunity by deliberately handling the ball (this does not apply to a goalkeeper within their penalty area)', 'denying the opposing team a goal or an obvious goal-scoring opportunity by deliberately handling the ball'],
        ['denying an obvious goal-scoring opportunity to an opponent moving towards the player\'s goal by an offense punishable by a free kick or a penalty kick', 'denying an obvious goal-scoring opportunity'],
        ['using offensive, insulting or abusive language and/or gestures', 'using offensive, insulting or abusive language and/or gestures'],
        ['receiving a second caution in the same match', 'receiving a second caution in the same match']
      ],
      YC: [
        ['unsporting behavior', 'unsporting behavior'],
        ['dissent by word or action', 'dissent by word or action'],
        ['persistent infringement of the Laws of the Game', 'persistent infringement of the Laws of the Game'],
        ['delaying the restart of play', 'delaying the restart of play'],
        ['failure to respect the required distance when play is restarted with a corner kick, free kick, or throw-in', 'failure to respect the required distance'],
        ['entering or re-entering the field of play without the referee\'s permission', 'entering or re-entering the field of play without permission'],
        ['deliberately leaving the field of play without the referee\'s permission', 'deliberately leaving the field of play without permission']
      ]
    },
    FIFA: {
      RC: [
        ['serious foul play', 'serious foul play'],
        ['violent conduct', 'violent conduct'],
        ['spitting at an opponent or any other person', 'spitting at an opponent or any other person'],
        ['denying the opposing team a goal or an obvious goal-scoring opportunity by deliberately handling the ball (this does not apply to a goalkeeper within their penalty area)', 'denying the opposing team a goal or an obvious goal-scoring opportunity by deliberately handling the ball'],
        ['denying an obvious goal-scoring opportunity to an opponent moving towards the player\'s goal by an offense punishable by a free kick or a penalty kick', 'denying an obvious goal-scoring opportunity'],
        ['using offensive, insulting or abusive language and/or gestures', 'using offensive, insulting or abusive language and/or gestures'],
        ['receiving a second caution in the same match', 'receiving a second caution in the same match']
      ],
      YC: [
        ['unsporting behavior', 'unsporting behavior'],
        ['dissent by word or action', 'dissent by word or action'],
        ['persistent infringement of the Laws of the Game', 'persistent infringement of the Laws of the Game'],
        ['delaying the restart of play', 'delaying the restart of play'],
        ['failure to respect the required distance when play is restarted with a corner kick, free kick, or throw-in', 'failure to respect the required distance'],
        ['entering or re-entering the field of play without the referee\'s permission', 'entering or re-entering the field of play without permission'],
        ['deliberately leaving the field of play without the referee\'s permission', 'deliberately leaving the field of play without permission']
      ]
    }
  };

  // Helper functions
  const getTerminology = () => {
    const terminologies = {
      NFHS: { official: 'referee', ejected: 'sent off', match: 'game', overtime: 'overtime', infringement: 'infringement' },
      NCAA: { official: 'referee', ejected: 'sent off', match: 'match', overtime: 'overtime', infringement: 'infringement' },
      FIFA: { official: 'referee', ejected: 'sent off', match: 'match', overtime: 'extra time', infringement: 'offense' }
    };
    return terminologies[activeRuleset];
  };

  const getCurrentRules = () => {
    return rules[activeRuleset];
  };

  const handleRulesetChange = (ruleset) => {
    setActiveRuleset(ruleset);
    // Reset form when changing rulesets
    setFormData(prev => ({ ...prev, offense: '', firstYCOffense: '', secondYCOffense: '' }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateShowFields = () => {
    const newShowFields = {
      number: formData.role === 'Player' || formData.role === 'Substitute',
      offenseTowards: ['serious foul play', 'violent conduct', 'spitting at an opponent or any other person'].includes(formData.offense),
      abusiveLanguage: formData.offense.includes('abusive language'),
      side: !formData.offense.includes('second caution') && formData.offense !== '',
      area: formData.side && (formData.side.includes('defending half') || formData.side.includes('attacking half')),
      overtime: formData.period === ' ',
      time: formData.period && formData.period !== '' && !formData.period.includes('before') && !formData.period.includes('after'),
      subsequentCaution: formData.offense.includes('second caution'),
      firstYCOvertime: formData.firstYCPeriod === ' ',
      firstYCTime: formData.firstYCPeriod && formData.firstYCPeriod !== '' && !formData.firstYCPeriod.includes('before') && !formData.firstYCPeriod.includes('after')
    };
    setShowFields(newShowFields);
  };

  useEffect(() => {
    updateShowFields();
  }, [formData]);

  const isFormValid = () => {
    const required = ['name', 'role', 'team', 'offense', 'period'];
    return required.every(field => formData[field] && formData[field] !== '');
  };

  const generateReport = () => {
    if (!isFormValid()) return '';

    const terminology = getTerminology();
    let report = `The ${formData.role.toLowerCase()} named ${formData.name}`;
    
    if (formData.number && showFields.number) {
      report += `, #${formData.number},`;
    }
    
    report += ` from ${formData.team} was ${terminology.ejected} for "${formData.offense}".`;
    
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
      
      if (formData.firstYCTime && formData.firstYCTimeType) {
        report += ` ${formData.firstYCTime} ${formData.firstYCTimeType}`;
      }
      
      if (formData.firstYCPeriod) {
        report += ` ${formData.firstYCPeriod === ' ' ? '' : formData.firstYCPeriod}`;
      }
      
      if (formData.firstYCOvertime) {
        report += ` ${formData.firstYCOvertime}`;
      }
      
      report += `. The second yellow card was shown for "${formData.secondYCOffense}".`;
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

  const terminology = getTerminology();
  const currentRules = getCurrentRules();

  return (
    <div className="container">
      <h1 className="text-center">Red Card Form</h1>
      
      <div className="row mb-3">
        <div className="col-12 text-center">
          <button 
            className={`btn ${activeRuleset === 'NFHS' ? 'btn-warning' : 'btn-outline-secondary'} me-2`}
            onClick={() => handleRulesetChange('NFHS')}
          >
            2024-25 NFHS
          </button>
          <button 
            className={`btn ${activeRuleset === 'NCAA' ? 'btn-warning' : 'btn-outline-secondary'} me-2`}
            onClick={() => handleRulesetChange('NCAA')}
          >
            2024-25 NCAA
          </button>
          <button 
            className={`btn ${activeRuleset === 'FIFA' ? 'btn-warning' : 'btn-outline-secondary'}`}
            onClick={() => handleRulesetChange('FIFA')}
          >
            2024/25 IFAB+FIFA
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-5">
          <div className="card" style={{ backgroundColor: 'rgb(255, 242, 242)' }}>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">
                    Full name of <span className="fw-bold">{terminology.ejected}</span> Participant
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ backgroundColor: formData.name ? 'white' : '#e5f5df' }}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Role of <span className="fw-bold">{terminology.ejected}</span> participant
                  </label>
                  <select
                    className="form-select"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    style={{ backgroundColor: formData.role ? 'white' : '#e5f5df' }}
                    required
                  >
                    <option value="">Select an Option</option>
                    <option value="Player">Player</option>
                    <option value="Substitute">Substitute</option>
                    <option value="Coach">Coach</option>
                  </select>
                </div>

                {showFields.number && (
                  <div className="mb-3">
                    <label className="form-label">
                      Jersey number of <span className="fw-bold">{terminology.ejected}</span> player or substitute
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="number"
                      value={formData.number}
                      onChange={handleInputChange}
                      style={{ backgroundColor: formData.number ? 'white' : '#e5f5df' }}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">
                    Team of the <span className="fw-bold">{terminology.ejected}</span> participant
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="team"
                    value={formData.team}
                    onChange={handleInputChange}
                    style={{ backgroundColor: formData.team ? 'white' : '#e5f5df' }}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Red Card Offense</label>
                  <select
                    className="form-select"
                    name="offense"
                    value={formData.offense}
                    onChange={handleInputChange}
                    style={{ backgroundColor: formData.offense ? 'white' : '#e5f5df' }}
                    required
                  >
                    <option value="">Select an Option</option>
                    {currentRules.RC.map(([value, label], index) => (
                      <option key={index} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                {showFields.offenseTowards && (
                  <div className="mb-3">
                    <select
                      className="form-select"
                      name="offenseTowards"
                      value={formData.offenseTowards}
                      onChange={handleInputChange}
                      style={{ backgroundColor: formData.offenseTowards ? 'white' : '#e5f5df' }}
                    >
                      <option value="">Select an Option</option>
                      <option value="This was done towards a player on the opposing team.">Towards a player on the opposing team</option>
                      <option value="This was done towards a substitute on the opposing team.">Towards a substitute on the opposing team</option>
                      <option value="This was done towards a coach on the opposing team.">Towards a coach on the opposing team</option>
                      <option value="This was done towards a teammate.">Towards a teammate</option>
                      <option value={`This was done towards a ${terminology.official}.`}>Towards a {terminology.official}</option>
                      <option value="This was done towards a spectator.">Towards a spectator</option>
                    </select>
                  </div>
                )}

                {showFields.abusiveLanguage && (
                  <div className="mb-3">
                    <label className="form-label">
                      Exactly quote all abusive language. Write the full word. Not symbols.
                    </label>
                    <textarea
                      className="form-control"
                      name="abusiveLanguage"
                      value={formData.abusiveLanguage}
                      onChange={handleInputChange}
                      rows="3"
                      style={{ backgroundColor: formData.abusiveLanguage ? 'white' : '#e5f5df' }}
                      placeholder="I hope you die on your way home, fucking bitch."
                    />
                  </div>
                )}

                {showFields.side && (
                  <div className="mb-3">
                    <label className="form-label">Red Card - Area of Offense (Choose the Best)</label>
                    <select
                      className="form-select"
                      name="side"
                      value={formData.side}
                      onChange={handleInputChange}
                      style={{ backgroundColor: formData.side ? 'white' : '#e5f5df' }}
                    >
                      <option value="">Select an Option</option>
                      <option value="in the offender's defending half of the field">Offender's Defending Half</option>
                      <option value="in the offender's attacking half of the field">Offender's Attacking Half</option>
                      <option value="near the midway line">near the midway line</option>
                      <option value="in the team area">Team Area</option>
                      <option value="in the spectators' area">Spectators' area</option>
                    </select>

                    {showFields.area && (
                      <select
                        className="form-select mt-2"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        style={{ backgroundColor: formData.area ? 'white' : '#e5f5df' }}
                      >
                        <option value="">Select an Option</option>
                        <option value="in the goal">in the goal</option>
                        <option value="in front of the goal">in front of the goal</option>
                        <option value="in the penalty area">*in* the penalty area</option>
                        <option value="near the penalty area">*near* the penalty area</option>
                        <option value="near the goal line">near the goal line</option>
                        <option value="near the touchline">near the touchline</option>
                        <option value="about 30 yards from the goal line">about 30 yards from the goal line</option>
                        <option value="near the corner flag">near the corner flag</option>
                      </select>
                    )}
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">
                    Period the participant was <span className="fw-bold">{terminology.ejected}</span>
                  </label>
                  <select
                    className="form-select"
                    name="period"
                    value={formData.period}
                    onChange={handleInputChange}
                    style={{ backgroundColor: formData.period ? 'white' : '#e5f5df' }}
                    required
                  >
                    <option value="">Select an Option</option>
                    <option value={`before the ${terminology.match}`}>before the {terminology.match}</option>
                    <option value="first half">first half</option>
                    <option value="during halftime">halftime</option>
                    <option value="second half">second half</option>
                    <option value={`after the ${terminology.match}`}>after the {terminology.match}</option>
                    <option value=" ">tie-breaking procedures...</option>
                  </select>

                  {showFields.overtime && (
                    <select
                      className="form-select mt-2"
                      name="overtime"
                      value={formData.overtime}
                      onChange={handleInputChange}
                      style={{ backgroundColor: formData.overtime ? 'white' : '#e5f5df' }}
                    >
                      <option value="">Select an Option</option>
                      <option value="between the end of regulation time and the start of the tie-breaking procedures">
                        between end of regulation time and start of tie breaker
                      </option>
                      <option value={`first ${terminology.overtime}`}>First {terminology.overtime}</option>
                      <option value={`between the end of the first ${terminology.overtime} and the end of the second ${terminology.overtime}`}>
                        Between First and Second {terminology.overtime}
                      </option>
                      <option value={`second ${terminology.overtime}`}>Second {terminology.overtime}</option>
                      <option value={`between the end of the second ${terminology.overtime} and the start of penalties`}>
                        Between Second {terminology.overtime} and Penalties
                      </option>
                      <option value="penalties">Penalties</option>
                    </select>
                  )}
                </div>

                {showFields.time && (
                  <div className="mb-3">
                    <label className="form-label">The Minute of the Red Card</label>
                    <div className="row">
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          maxLength="3"
                          title="If you don't know, make your best guess"
                        />
                      </div>
                      <div className="col-6">
                        <select
                          className="form-select"
                          name="timeType"
                          value={formData.timeType}
                          onChange={handleInputChange}
                        >
                          <option value="">Select an Option</option>
                          <option value="minutes into the">Into the Period</option>
                          <option value="minutes before the end of the">Remaining In the Period</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Subsequent Caution Form */}
          {showFields.subsequentCaution && (
            <div className="card mt-3" style={{ backgroundColor: 'rgb(255, 255, 214)' }}>
              <div className="card-body">
                <h5>First Yellow Card Offense</h5>
                <div className="mb-3">
                  <select
                    className="form-select"
                    name="firstYCOffense"
                    value={formData.firstYCOffense}
                    onChange={handleInputChange}
                    style={{ backgroundColor: formData.firstYCOffense ? 'white' : '#e5f5df' }}
                  >
                    <option value="">Select an Option</option>
                    {currentRules.YC.map(([value, label], index) => (
                      <option key={index} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Period of the First Yellow Card</label>
                  <select
                    className="form-select"
                    name="firstYCPeriod"
                    value={formData.firstYCPeriod}
                    onChange={handleInputChange}
                    style={{ backgroundColor: formData.firstYCPeriod ? 'white' : '#e5f5df' }}
                  >
                    <option value="">Select an Option</option>
                    <option value={`before the ${terminology.match}`}>before the {terminology.match}</option>
                    <option value="first half">first half</option>
                    <option value="during halftime">halftime</option>
                    <option value="second half">second half</option>
                    <option value={`after the ${terminology.match}`}>after the {terminology.match}</option>
                    <option value=" ">tie-breaking procedures...</option>
                  </select>

                  {showFields.firstYCOvertime && (
                    <select
                      className="form-select mt-2"
                      name="firstYCOvertime"
                      value={formData.firstYCOvertime}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an Option</option>
                      <option value="between the end of regulation time and the start of the tie-breaking procedures">
                        between end of regulation time and start of tie breaker
                      </option>
                      <option value={`first ${terminology.overtime}`}>First {terminology.overtime}</option>
                      <option value={`between the end of the first ${terminology.overtime} and the end of the second ${terminology.overtime}`}>
                        Between First and Second {terminology.overtime}
                      </option>
                      <option value={`second ${terminology.overtime}`}>Second {terminology.overtime}</option>
                      <option value={`between the end of the second ${terminology.overtime} and the start of penalties`}>
                        Between Second {terminology.overtime} and Penalties
                      </option>
                      <option value="penalties">Penalties</option>
                    </select>
                  )}
                </div>

                {showFields.firstYCTime && (
                  <div className="mb-3">
                    <label className="form-label">The Minute of the First Yellow Card</label>
                    <div className="row">
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control"
                          name="firstYCTime"
                          value={formData.firstYCTime}
                          onChange={handleInputChange}
                          maxLength="3"
                        />
                      </div>
                      <div className="col-6">
                        <select
                          className="form-select"
                          name="firstYCTimeType"
                          value={formData.firstYCTimeType}
                          onChange={handleInputChange}
                        >
                          <option value="">Select an Option</option>
                          <option value="minutes into the">Into the Period</option>
                          <option value="minutes before the end of the">Remaining In the Period</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <h5>Second Yellow Card Offense</h5>
                <div className="mb-3">
                  <select
                    className="form-select"
                    name="secondYCOffense"
                    value={formData.secondYCOffense}
                    onChange={handleInputChange}
                    style={{ backgroundColor: formData.secondYCOffense ? 'white' : '#e5f5df' }}
                  >
                    <option value="">Select an Option</option>
                    {currentRules.YC.map(([value, label], index) => (
                      <option key={index} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Report Preview */}
        <div className="col-lg-7">
          <div className="sticky-top">
            <div className="alert alert-danger" style={{ display: isFormValid() ? 'none' : 'block' }}>
              <strong>Fill in all of the highlighted textboxes!</strong>
            </div>
            
            <div className="alert alert-success" style={{ display: isFormValid() ? 'block' : 'none' }}>
              <strong>Make changes and add details before submitting!</strong><br />
              <button onClick={copyToClipboard} className="btn btn-success btn-sm mt-2">
                Click to Copy Report
              </button>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Report Preview</h5>
                <div className="report-text" style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.5' }}>
                  {generateReport()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ejection;