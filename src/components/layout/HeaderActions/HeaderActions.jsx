import { HeaderActionsProps } from './HeaderActions.props'

export function HeaderActions({ children }) {
  return (
    <div test-id="el-w9x0y1z2" className="flex items-center gap-2">
      {children}
    </div>
  )
}

HeaderActions.propTypes = HeaderActionsProps
