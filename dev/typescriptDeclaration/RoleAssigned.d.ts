/**
 * Created by azertypow on 09/05/2017.
 */

interface RoleAssigned{
    playerIndex: number,
    playerRole: string,
    playerEmplacement: string,
}

interface ListOfRoleAssignedForPlayer extends Array<RoleAssigned>{}

// A -> let variable: RoleAssigned[] = [{…},{…},…];
// B -> let variable: ListOfRoleAssignedForPlayer = [{…},{…},…];

interface Assignation{
    playerIndex: number,
    assignation: string,
}