package com.acrylic.repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class UserRepositoryDynamicImpl
    implements UserRepositoryDynamic {

    @PersistenceContext
    private EntityManager entityManager;

//    @Query("UPDATE User u SET u.username =  WHERE u.id = :id")
//    Optional<User> updateUserById(@Param("id") Long id, @Param("nu") User user);

//    @Override
//    public void updateUserById(Long id, User newUser) {
//        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
//        CriteriaUpdate<User> criteriaUpdate = criteriaBuilder.createCriteriaUpdate(User.class);
//
//        Root<User> userRoot = criteriaUpdate.from(User.class);
//        Path<String> emailPath = userRoot.get("email");
//
//        if (newUser.getEmail() != null)
//            criteriaUpdate.set(userRoot.get("email"), newUser.getEmail());
//
//
//        List<Predicate> predicates = new ArrayList<>();
//        for (String email : emails) {
//            predicates.add(criteriaBuilder.like(emailPath, email));
//        }
//        criteriaUpdate.select(userRoot)
//                .where(criteriaBuilder.or(predicates.toArray(new Predicate[0])));
//
//        entityManager.createQuery(criteriaUpdate)
//                .getResultList();
//    }
}
