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
// Now Assist AI Agents: read consumed external agents and their registration records.
CrossScopePrivilege({ $id: Now.ID['xs-read-aia-agent'], operation: 'read', status: 'allowed', targetName: 'sn_aia_agent', targetScope: 'sn_aia', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-read-aia-ext-config'], operation: 'read', status: 'allowed', targetName: 'sn_aia_external_agent_configuration', targetScope: 'sn_aia', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-read-aia-ext-provider'], operation: 'read', status: 'allowed', targetName: 'sn_aia_external_agent_provider', targetScope: 'sn_aia', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-read-aia-ext-card'], operation: 'read', status: 'allowed', targetName: 'sn_aia_external_agent_card', targetScope: 'sn_aia', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-read-aia-ext-discovery'], operation: 'read', status: 'allowed', targetName: 'sn_aia_external_agent_discovery', targetScope: 'sn_aia', targetType: 'sys_db_object' })

// Data Foundation Model (AI Control Tower inventory): read + retire orphaned AI assets and CIs.
CrossScopePrivilege({ $id: Now.ID['xs-read-ai-asset'], operation: 'read', status: 'allowed', targetName: 'alm_ai_system_digital_asset', targetScope: 'sn_cmdb_foundation', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-write-ai-asset'], operation: 'write', status: 'allowed', targetName: 'alm_ai_system_digital_asset', targetScope: 'sn_cmdb_foundation', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-read-ai-ci'], operation: 'read', status: 'allowed', targetName: 'cmdb_ci_function_ai', targetScope: 'sn_cmdb_foundation', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-write-ai-ci'], operation: 'write', status: 'allowed', targetName: 'cmdb_ci_function_ai', targetScope: 'sn_cmdb_foundation', targetType: 'sys_db_object' })

// Global: CMDB base table and deletion audit trail.
CrossScopePrivilege({ $id: Now.ID['xs-read-cmdb-ci'], operation: 'read', status: 'allowed', targetName: 'cmdb_ci', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-write-cmdb-ci'], operation: 'write', status: 'allowed', targetName: 'cmdb_ci', targetScope: 'global', targetType: 'sys_db_object' })
CrossScopePrivilege({ $id: Now.ID['xs-read-audit-delete'], operation: 'read', status: 'allowed', targetName: 'sys_audit_delete', targetScope: 'global', targetType: 'sys_db_object' })

// Generative AI Controller: plain-English explanations of findings.
CrossScopePrivilege({ $id: Now.ID['xs-exec-llmclient'], operation: 'execute', status: 'allowed', targetName: 'LLMClient', targetScope: 'sn_generative_ai', targetType: 'sys_script_include' })
