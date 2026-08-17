// Used only when CognoDB has no valid seeded graph records yet.
export const mockData = {
  skills: [
    { id: 'react', name: 'React', category: 'Frontend', level: 'Advanced', color: '#61dafb', developers: 3, projects: 3 },
    { id: 'typescript', name: 'TypeScript', category: 'Language', level: 'Advanced', color: '#3178c6', developers: 4, projects: 3 },
    { id: 'node-js', name: 'Node.js', category: 'Backend', level: 'Advanced', color: '#78c257', developers: 3, projects: 3 },
    { id: 'neo4j', name: 'Neo4j', category: 'Data', level: 'Intermediate', color: '#008cc1', developers: 1, projects: 1 },
    { id: 'cypher', name: 'Cypher', category: 'Data', level: 'Intermediate', color: '#0aa1c0', developers: 1, projects: 1 },
    { id: 'figma', name: 'Figma', category: 'Design', level: 'Advanced', color: '#f24e1e', developers: 1, projects: 2 }
  ],
  projects: [
    { id: 'atlas', name: 'Atlas Analytics', description: 'Self-service product analytics for growing teams.', status: 'Active', category: 'SaaS', updated: '2026-08-15', color: '#7c3aed', skills: ['React', 'TypeScript', 'Node.js'], contributors: 3 },
    { id: 'graphlens', name: 'GraphLens', description: 'Knowledge graph exploration workspace for research teams.', status: 'Active', category: 'Data', updated: '2026-08-13', color: '#0891b2', skills: ['React', 'Neo4j', 'Cypher'], contributors: 3 },
    { id: 'pulse', name: 'Pulse Mobile', description: 'A cross-platform habit and wellbeing companion.', status: 'In discovery', category: 'Consumer', updated: '2026-08-10', color: '#db2777', skills: ['TypeScript', 'Figma'], contributors: 2 }
  ],
  developers: [
    { id: 'priya', name: 'Priya Sharma', role: 'Full-stack Engineer', initials: 'PS', skills: ['React', 'TypeScript', 'Node.js'] },
    { id: 'arjun', name: 'Arjun Mehta', role: 'Data Engineer', initials: 'AM', skills: ['Neo4j', 'Cypher', 'Node.js'] },
    { id: 'meera', name: 'Meera Iyer', role: 'Product Designer', initials: 'MI', skills: ['Figma', 'React'] },
    { id: 'ravi', name: 'Ravi Nair', role: 'Backend Engineer', initials: 'RN', skills: ['Node.js', 'TypeScript'] }
  ]
};
