import '@servicenow/sdk/global'
import { Acl, CrossScopePrivilege } from '@servicenow/sdk/core'
import { sentinelViewer, sentinelAdmin } from './roles.now'

// Viewers (and admins, who contain the viewer role) can read everything.
Acl({ $id: Now.ID['acl-agent-read-viewer'], type: 'record', table: 'x_snc_a2a_sentinel_agent', operation: 'read', roles: [sentinelViewer] })
Acl({ $id: Now.ID['acl-snapshot-read-viewer'], type: 'record', table: 'x_snc_a2a_sentinel_snapshot', operation: 'read', roles: [sentinelViewer] })
Acl({ $id: Now.ID['acl-probe-read-viewer'], type: 'record', table: 'x_snc_a2a_sentinel_probe', operation: 'read', roles: [sentinelViewer] })
Acl({ $id: Now.ID['acl-finding-read-viewer'], type: 'record', table: 'x_snc_a2a_sentinel_finding', operation: 'read', roles: [sentinelViewer] })

// Only Sentinel admins may create, change or delete records.
Acl({ $id: Now.ID['acl-agent-create-admin'], type: 'record', table: 'x_snc_a2a_sentinel_agent', operation: 'create', roles: [sentinelAdmin] })
Acl({ $id: Now.ID['acl-agent-write-admin'], type: 'record', table: 'x_snc_a2a_sentinel_agent', operation: 'write', roles: [sentinelAdmin] })
Acl({ $id: Now.ID['acl-agent-delete-admin'], type: 'record', table: 'x_snc_a2a_sentinel_agent', operation: 'delete', roles: [sentinelAdmin] })
Acl({ $id: Now.ID['acl-snapshot-create-admin'], type: 'record', table: 'x_snc_a2a_sentinel_snapshot', operation: 'create', roles: [sentinelAdmin] })
Acl({ $id: Now.ID['acl-snapshot-write-admin'], type: 'record', table: 'x_snc_a2a_sentinel_snapshot', operation: 'write', roles: [sentinelAdmin] })
Acl({ $id: Now.ID['acl-snapshot-delete-admin'], type: 'record', table: 'x_snc_a2a_sentinel_snapshot', operation: 'delete', roles: [sentinelAdmin] })
Acl({ $id: Now.ID['acl-probe-create-admin'], type: 'record', table: 'x_snc_a2a_sentinel_probe', operation: 'create', roles: [sentinelAdmin] })
Acl({ $id: Now.ID['acl-probe-write-admin'], type: 'record', table: 'x_snc_a2a_sentinel_probe', operation: 'write', roles: [sentinelAdmin] })
Acl({ $id: Now.ID['acl-probe-delete-admin'], type: 'record', table: 'x_snc_a2a_sentinel_probe', operation: 'delete', roles: [sentinelAdmin] })
Acl({ $id: Now.ID['acl-finding-create-admin'], type: 'record', table: 'x_snc_a2a_sentinel_finding', operation: 'create', roles: [sentinelAdmin] })
Acl({ $id: Now.ID['acl-finding-write-admin'], type: 'record', table: 'x_snc_a2a_sentinel_finding', operation: 'write', roles: [sentinelAdmin] })
Acl({ $id: Now.ID['acl-finding-delete-admin'], type: 'record', table: 'x_snc_a2a_sentinel_finding', operation: 'delete', roles: [sentinelAdmin] })

// Cross-scope access the watch logic needs (declared, not granted implicitly).
// target_scope is a reference to sys_scope, so it takes the scope's sys_id, not its name.
// Store-app scope sys_ids are identical on every instance.
const SCOPE_AIA = '32808450431302106c3603295bb8f245' // sn_aia: Now Assist AI Agents
const SCOPE_DATA_FOUNDATION = '239abdfe9ff4121032337277da0a1ca9' // sn_cmdb_foundation: Data Foundation Model
const SCOPE_GENAI = '7cc4ec81533121106b38ddeeff7b12ee' // sn_generative_ai: Generative AI Controller
// Now Assist AI Agents: read consumed external agents and their registration records.
CrossScopePrivilege({ $id: Now.ID['xs-read-aia-agent'], operation: 'read', status: 'allowed', targetName: 'sn_aia_agent', targetScope: SCOPE_AIA, targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-read-aia-ext-config'], operation: 'read', status: 'allowed', targetName: 'sn_aia_external_agent_configuration', targetScope: SCOPE_AIA, targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-read-aia-ext-provider'], operation: 'read', status: 'allowed', targetName: 'sn_aia_external_agent_provider', targetScope: SCOPE_AIA, targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-read-aia-ext-card'], operation: 'read', status: 'allowed', targetName: 'sn_aia_external_agent_card', targetScope: SCOPE_AIA, targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-read-aia-ext-discovery'], operation: 'read', status: 'allowed', targetName: 'sn_aia_external_agent_discovery', targetScope: SCOPE_AIA, targetType: 'sys_db_object' })

// Data Foundation Model (AI Control Tower inventory): read + retire orphaned AI assets and CIs.
CrossScopePrivilege({ $id: Now.ID['xs-read-ai-asset'], operation: 'read', status: 'allowed', targetName: 'alm_ai_system_digital_asset', targetScope: SCOPE_DATA_FOUNDATION, targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-write-ai-asset'], operation: 'write', status: 'allowed', targetName: 'alm_ai_system_digital_asset', targetScope: SCOPE_DATA_FOUNDATION, targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-read-ai-ci'], operation: 'read', status: 'allowed', targetName: 'cmdb_ci_function_ai', targetScope: SCOPE_DATA_FOUNDATION, targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-write-ai-ci'], operation: 'write', status: 'allowed', targetName: 'cmdb_ci_function_ai', targetScope: SCOPE_DATA_FOUNDATION, targetType: 'sys_db_object' })

// Global: CMDB base table and deletion audit trail.
CrossScopePrivilege({ $id: Now.ID['xs-read-cmdb-ci'], operation: 'read', status: 'allowed', targetName: 'cmdb_ci', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-write-cmdb-ci'], operation: 'write', status: 'allowed', targetName: 'cmdb_ci', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-read-audit-delete'], operation: 'read', status: 'allowed', targetName: 'sys_audit_delete', targetScope: 'global', targetType: 'sys_db_object' })

// Generative AI Controller: plain-English explanations of findings.
CrossScopePrivilege({ $id: Now.ID['xs-exec-llmclient'], operation: 'execute', status: 'allowed', targetName: 'LLMClient', targetScope: SCOPE_GENAI, targetType: 'sys_script_include' })
