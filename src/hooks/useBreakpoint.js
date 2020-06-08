import {useContext} from 'react';
import {BreakpointContext} from '../context/breakpoint-context';

const useBreakpoint = () => {
    const defaultValue = {}
    
    const context = useContext(BreakpointContext);
    if(context === defaultValue) {
      throw new Error('useBreakpoint must be used within BreakpointProvider');
    }
    return context;
}
  
export default useBreakpoint;