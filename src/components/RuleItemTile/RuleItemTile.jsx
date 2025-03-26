import { Button } from "../Button/Button"

export const RuleItemTile = ({rule, ruleKey}) => {
    return (
        <div style={{border: '0.5px solid gray',
            borderRadius: '2px',
            padding: '15px 15px 15px 45px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'left'}}>
            <div style={{width: '100%'}}>
                <Button style="unstyled" width="full">
                    <p style={{margin: '0'}}>{rule.key}</p>
                    <p style={{margin: '0'}}>
                        <span>{rule.status}</span>
                        <span>{rule.type}</span>
                    </p>
                </Button>
            </div>
            <div>
                <a href="#" onClick={() => console.log('')} className="text-dark" style={{fontSize: '1.5rem'}}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path></svg></a>
            </div>
        </div>
    )
}